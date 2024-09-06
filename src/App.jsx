import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PostProvider } from './contexts/PostContext';
import ErrorPage from './pages/ErrorPage';
import PostGallery from './pages/PostGallery';
import NewEditPostPage from './pages/NewEditPostPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<PostGallery />} />
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
