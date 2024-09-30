import styles from './Image.module.css';

function Image({ src, alt, post, preview, profile, size, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`
      ${post && styles.postImage} 
      ${preview && styles.previewImage} 
      ${profile && styles.profileImage}
      ${size && styles.customSize}`}
    >
      <img
        src={src}
        alt={alt}
        style={{
          '--img-width': `${size?.ws}px`,
          '--img-height': `${size?.hs}px`,
          '--img-width-lg': `${size?.wl}px`,
          '--img-height-lg': `${size?.hl}px`,
        }}
      />
    </div>
  );
}

export default Image;
