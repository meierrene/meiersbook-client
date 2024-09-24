import styles from './Image.module.css';

function Image({ src, alt, post, preview, profile }) {
  return (
    <div
      className={`
      ${post && styles.postImage} 
      ${preview && styles.previewImage} 
      ${profile && styles.profileImage}`}
    >
      <img src={src} alt={alt} />
    </div>
  );
}

export default Image;
