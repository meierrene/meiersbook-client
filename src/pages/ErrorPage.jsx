import { usePosts } from '../contexts/PostContext';

const ErrorPage = () => {
  const { status, message } = usePosts();

  document.title = 'Not found!';

  return (
    <div className="error">
      <img
        className="error-image"
        src={require('../img/404-error.jpg')}
        alt="Error 404"
      />
      <h2 className="error-title">Something went wrong!</h2>
      <div className="error-message">
        {status !== 'success' && <span>Error {status} - </span>}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorPage;
