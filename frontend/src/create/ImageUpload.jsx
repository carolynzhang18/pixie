import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useContext } from 'react';
import { WebsiteContext } from '../App';

const ImageUpload = () => {
  const {websiteData, setWebsiteData} = useContext(WebsiteContext);

  async function handleImageUpload(fileList) {
    const files = Array.from(fileList);
    
    const filePromises = files.map((file) => {
      // Return a promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            // Resolve the promise with the response value
            resolve(reader.result);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });
  
    // Wait for all promises to be resolved
    const convertedImages = await Promise.all(filePromises);
    setWebsiteData({...websiteData, productImages: convertedImages});
  }

  return (
    <div className="option-section"> {}
        <h3 className="option-title">Upload Product Images</h3> {}
        <IconButton
          variant="contained"
          component="label"
        >
          <UploadIcon />
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => {handleImageUpload(e.target.files)}}
          />
        </IconButton>
        <div className="grid grid-cols-4 gap-8 p-8" id="items">
          {websiteData.productImages?.map((image, idx) => <div key={idx}><img src={image} alt="" /></div>)}
        </div>
      </div>
  );
};

export default ImageUpload;
