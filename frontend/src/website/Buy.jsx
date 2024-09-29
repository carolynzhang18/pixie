import { useContext, useState } from 'react';
import { WebsiteContext } from '../App';
import { TextField, Button, Modal, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Buy = () => {
  const {websiteData} = useContext(WebsiteContext);
  const { productImages, productPrices } = websiteData;
  const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let total = 0;
  const [modal, setModal] = useState(false);

  return (
    <div className="App">
      <img src={websiteData.backgroundImage} alt="background" style={{ width: "100%", margin: 0, padding: 0, position: "absolute", top: "0%", left: "0%", maxHeight: "100vh" }} />
      <div style={{ backgroundColor: "#e5e5e5", position: "absolute", top: "50px", left: "50px", right: "50px", bottom: "50px", borderRadius: "20px", padding: "50px", opacity: "0.95" }}>
        <h1 className="title">Checkout</h1>
        <p>Thanks for visiting {websiteData.name}!</p>

        <h3 className="option-title mt-3">Your items:</h3>
        <div className="max-w-6xl grid grid-cols-6 gap-8 p-8" id="items">
        {
          items.map((item, idx) => { 
            total += parseFloat(productPrices[item]);
            return (
            <div key={idx} className="relative w-full">
            <div className="relative w-full h-32 overflow-hidden"
            >
              {/* Ensure square image */}
              <img src={productImages[item]} alt={`Product ${idx + 1}`} className="object-cover w-full h-full" style={{ aspectRatio: '1 / 1' }} />
            </div>
            {/* Manually render the corresponding price */}
            <p className="mt-2 text-md">
              {productPrices[item] ? `Price: $${productPrices[item]}` : "No price set"}
            </p>
          </div>
          )})
        }
        </div>

        <h3 className="option-title mt-3 mb-6">Total: ${total}</h3>

        {/* Input Section */}
        <div className="input-container">
          <TextField 
            label="Midnight address" 
            variant="outlined" 
            fullWidth 
          />
        </div>

        <Button 
            variant="contained" 
            style={{ width: "100px", marginTop: "20px"}}
            onClick={() => {
              setModal(true);
            }}
          >
            PAY!
          </Button>
          <Modal
            open={modal}
            onClose={() => {setModal(false); localStorage.removeItem("cart"); }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p>Thank you for your purchase!</p>
            </Box>
          </Modal>
        </div>
    </div>
  );
};

export default Buy;
