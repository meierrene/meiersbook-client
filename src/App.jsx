import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { PostProvider } from './contexts/PostContext';
import Footer from './ui/Footer';
import Header from './ui/Header';
import LoginPage from './pages/LoginPage';
import NewEditPostPage from './pages/NewEditPostPage';
// import PostGalleryPage from './pages/PostGalleryPage';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import PostPage from './pages/PostPage';
import ErrorPage from './pages/ErrorPage';
import { lazy, Suspense } from 'react';
import Spinner from './ui/Spinner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
const PostGalleryPage = lazy(() => import('./pages/PostGalleryPage'));

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={new QueryClient()}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <PostProvider>
            <BrowserRouter>
              <Header>
                <Suspense fallback={<Spinner />}>
                  <Routes>
                    <Route index element={<PostGalleryPage />} />
                    <Route path="posts" element={<PostGalleryPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="newpost" element={<NewEditPostPage />} />
                      <Route path=":id" element={<PostPage />}>
                        <Route index element={<Navigate replace to="" />} />
                        <Route path="editpost" element={<NewEditPostPage />} />
                      </Route>
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </Suspense>
              </Header>
              <Footer />
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: { duration: 3000 },
                error: { duration: 5000 },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: '#eee',
                  color: '#333',
                },
              }}
            />
          </PostProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
