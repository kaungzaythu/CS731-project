import React, { useState } from 'react';

const ImageUploader = ({onImageUpload}) => {
  const [imageData, setImageData] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setImageData(base64);
      // Send base64 code to the server using an API call
      // Example: sendToServer(base64);

      onImageUpload(base64);
      console.log(`base64 is here => ${base64}`)
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
        width: '300px',
        height: '300px',
        border: '2px dashed #ccc',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {imageData ? (
        <img
          src={imageData}
          alt="Uploaded Image"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      ) : (
        <span>Drag and drop an image here</span>
      )}
    </div>
  );
};

export default ImageUploader;