import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useContext, useState } from 'react';
import { WebsiteContext } from '../App';

const ImageUpload = () => {
  const { websiteData, setWebsiteData } = useContext(WebsiteContext);
  const [previewImages, setPreviewImages] = useState([]);

  async function handleImageUpload(fileList) {
    const files = Array.from(fileList);
    
    const filePromises = files.map((file) => {
      // Return a promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            resolve(reader.result); // Resolve with the base64 data URL
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file); // Convert to base64
      });
    });

    const convertedImages = await Promise.all(filePromises);
    setPreviewImages(convertedImages); // Show preview images
    setWebsiteData({ ...websiteData, productImages: convertedImages }); // Save to context for final display
  }

  return (
    <div className="option-section">
      <h3 className="option-title">Upload Product Images</h3>
      <IconButton
        variant="contained"
        component="label"
      >
        <UploadIcon />
        <input
          type="file"
          hidden
          multiple
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </IconButton>

      {/* Image Preview Grid */}
      <div className="grid grid-cols-4 gap-8 p-8">
        {previewImages?.map((image, idx) => (
          <div key={idx} className="relative w-48 h-48 overflow-hidden">
            <img src={image} alt="preview" className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
