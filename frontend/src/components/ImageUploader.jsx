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
        borderRadius: '50%', // Make it a circle by setting borderRadius to 50%
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'hidden', // Hide the parts of the image outside the circle
      }}
    >
      {imageData ? (
        <img
          src={imageData}
          alt="Uploaded Image"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} // Maintain aspect ratio and cover the circle area
        />
      ) : (
        <span>Drag and drop an image here</span>
      )}
    </div>
  );
};

export default ImageUploader;