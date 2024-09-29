import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useContext, useState } from 'react';
import { WebsiteContext } from '../App';

const ImageUpload = () => {
  const { websiteData, setWebsiteData } = useContext(WebsiteContext);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagePrices, setImagePrices] = useState({});

  async function handleImageUpload(fileList) {
    const files = Array.from(fileList);
    
    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    const convertedImages = await Promise.all(filePromises);
    const updatedPreviewImages = [...previewImages, ...convertedImages];

    // Initialize price for each new image as empty
    const updatedPrices = { ...imagePrices };
    updatedPreviewImages.forEach((image, idx) => {
      if (!(idx in updatedPrices)) {
        updatedPrices[idx] = ""; // Initialize price as an empty string
      }
    });

    setPreviewImages(updatedPreviewImages);
    setImagePrices(updatedPrices);

    // Debugging log to ensure productPrices is updated
    setWebsiteData({
      ...websiteData,
      productImages: updatedPreviewImages, // Save images to context
      productPrices: updatedPrices,        // Save prices to context
    });

    console.log("Updated WebsiteContext after image upload:", {
      ...websiteData,
      productPrices: updatedPrices,
    });
  }

  const handlePriceChange = (idx, price) => {
    const updatedPrices = { ...imagePrices, [idx]: price };
    setImagePrices(updatedPrices);

    // Save the updated prices in WebsiteContext
    setWebsiteData({
      ...websiteData,
      productPrices: updatedPrices,
    });

    // Log to check if productPrices is properly updated
    console.log("Updated productPrices:", updatedPrices);
  };

  return (
    <div className="image-upload-container">
      <h3 className="option-title">Upload Product Images and Set Prices</h3>
      <IconButton variant="contained" component="label">
        <UploadIcon />
        <input
          type="file"
          hidden
          multiple
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </IconButton>

      {/* Image Grid with Price Input */}
      <div className="image-upload-grid">
        {previewImages?.map((image, idx) => (
          <div key={idx} className="image-upload-item">
            <img src={image} alt="product" />
            <input
              type="text"
              placeholder="Enter price"
              value={imagePrices[idx] || ""}
              onChange={(e) => handlePriceChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
