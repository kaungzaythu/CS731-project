import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const MultipleImageUploader = ({ onImageUpload }) => {
  const [imageData, setImageData] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const images = Array.from(files);

    const readers = images.map((file) => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((results) => {
        setImageData((imageData) => [...imageData, ...results]);
        onImageUpload([...imageData, ...results]);
      })
      .catch((error) => {
        console.log('Error reading files:', error);
      });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setImageData((imageData) => {
      const updatedImageData = [...imageData];
      updatedImageData.splice(index, 1);
      return updatedImageData;
    });
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        height: '150px',
        border: '2px dashed #7A3385',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'auto',
        padding: '10px',
      }}
    >
      <div style={{ marginBottom: '10px' }}>Drag and drop images here</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {imageData.map((image, index) => (
            <div
                key={index}
                style={{
                width: '100px',
                height: '100px',
                marginRight: '10px',
                marginBottom: '10px',
                position: 'relative',
                }}
            >
                <img
                src={image}
                alt={`Uploaded Image ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: '#7A3385',
                        border: 'none',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                      }}
                    >
                    <ClearIcon />
                    </button>
            </div>
            ))}
      </div>
    </div>
  );
};

export default MultipleImageUploader;