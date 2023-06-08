import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [imageData, setImageData] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setImageData(base64);
      onImageUpload(base64);
      console.log(`base64 is here => ${base64}`);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '150px',
        height: '150px',
        border: '2px dashed #7A3385',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {imageData ? (
          <img
            src={imageData}
            alt="Uploaded Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>Drag and drop an image here</span>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;