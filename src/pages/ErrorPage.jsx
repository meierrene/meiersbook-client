import { usePosts } from '../contexts/PostContext';
import { ERROR_IMAGE } from '../utils/helpers';

const ErrorPage = () => {
  const { status, message } = usePosts();

  document.title = 'Not found!';

  return (
    <div className="error">
      <img className="error-image" src={ERROR_IMAGE} alt="Error 404" />
      <h2 className="error-title">Something went wrong!</h2>
      <div className="error-message">
        {status !== 'success' && <span>Error {status} - </span>}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorPage;
