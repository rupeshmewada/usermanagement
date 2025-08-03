import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function ImageUp() {
 
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
      setFileName(file.name);
    } 
  };
  
  // Remember to revoke the object URL when the component unmounts or the file changes
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imagePreviewUrl && (
        <div>
          <p>Preview of: <strong>{fileName}</strong></p>
          <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
      )}
    </div>
  );
}
export default ImageUp

