import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

function ImageUpload({ 
  imageFile, 
  onImageChange, 
  onImageRemove, 
  label = "Upload Image",
  accept = "image/*" 
}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    
    // Cleanup function to free memory
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    onImageChange(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageRemove();
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        {label}
      </label>
      
      <input
        type="file"
        accept={accept}
        onChange={handleImageChange}
        style={{ marginBottom: '10px' }}
      />
      
      {preview && (
        <div style={{ marginTop: '10px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              objectFit: 'cover',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }} 
          />
          <div style={{ marginTop: '5px' }}>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;