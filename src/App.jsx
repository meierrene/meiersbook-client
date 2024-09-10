import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PostProvider } from './contexts/PostContext';
import Footer from './ui/Footer';
import Header from './ui/Header';
import LoginPage from './pages/LoginPage';
import NewEditPostPage from './pages/NewEditPostPage';
import PostGalleryPage from './pages/PostGalleryPage';
import PostPage from './pages/PostPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<PostGalleryPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="posts" element={<PostGalleryPage />} />
          <Route path="newpost" element={<NewEditPostPage />} />
          <Route path=":id" element={<PostPage />}>
            <Route index element={<Navigate replace to="" />} />
            <Route path="editpost" element={<NewEditPostPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </PostProvider>
  );
};

export default App;
