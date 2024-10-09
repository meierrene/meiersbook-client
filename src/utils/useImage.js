import { useState } from 'react';

export const useImage = (existingImage, existingId) => {
  const [previewImage, setPreviewImage] = useState(
    existingImage ? existingImage : null
  );
  const [imageData, setImageData] = useState(existingId ? existingImage : {});

  const handleChangeImage = e => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImageData(e.target.files[0]);
    }
  };

  const changedImage = !!previewImage?.includes('blob');

  return { previewImage, imageData, handleChangeImage, changedImage };
};
