import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import NewEditPostPage from './pages/NewEditPostPage';
import Footer from './ui/Footer';
import Header from './ui/Header';
// import PostGalleryPage from './pages/PostGalleryPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';
import PostPage from './pages/PostPage';
import SettingsPage from './pages/SettingsPage';
import Spinner from './ui/Spinner';
import MyGalleryPage from './pages/MyGalleryPage';
const PostGalleryPage = lazy(() => import('./pages/PostGalleryPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <BrowserRouter>
            <Header>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route index element={<PostGalleryPage />} />
                  <Route path="posts" element={<PostGalleryPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="myposts" element={<MyGalleryPage />} />
                    <Route path="newpost" element={<NewEditPostPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="posts/:id" element={<PostPage />}>
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
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
