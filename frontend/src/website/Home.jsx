import '../index.css'; 
import React, { useContext, useState } from "react";
import { WebsiteContext } from '../App';

const Home = () => {
  const { websiteData } = useContext(WebsiteContext);
  const { productImages, productPrices } = websiteData;
  const [buttonStyles, setButtonStyles] = useState(productImages.map(() => false));

  return (
    <div className="text-center" style={{ backgroundColor: "#e5e5e5", color: websiteData.primaryColor }}>
      {/* Background Image */}
      <img src={websiteData.backgroundImage} alt="background" style={{ width: "100%" }} />

      <div style={{ position: "absolute", width: "100%", verticalAlign: "middle", top: "45%", color: websiteData.primaryColor }}>
        <h1 className="text-6xl font-serif text-center">{websiteData.name}</h1>
        <p className="text-xl" style={{ color: "##285073", marginTop: "-20px" }}>{websiteData.description}</p>
        <button onClick={() => document.getElementById('items')?.scrollIntoView({ behavior: "smooth" })} className="rounded-full p-2 px-8 font-serif mt-8 text-xl" style={{ color: websiteData.primaryColor, backgroundColor: "#fcfeff", border:" solid black 1px" }}>
          SHOP NOW
        </button>
      </div>

      {/* Display Images with Corresponding Prices */}
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 p-8" id="items">
        {productImages?.map((image, idx) => (
          <div key={idx} className="relative w-full">
            <div className="relative w-full h-64 overflow-hidden"
              onMouseOver={() => setButtonStyles(prev => {
                const copy = Array.from(prev);
                copy[idx] = true;
                return copy;
              })}
              onMouseLeave={() => setButtonStyles(prev => {
                const copy = Array.from(prev);
                copy[idx] = false;
                return copy;
              })}
            >
              {/* Ensure square image */}
              <img src={image} alt={`Product ${idx + 1}`} className="object-cover w-full h-full" style={{ aspectRatio: '1 / 1', border: "solid black 1px" }} />
              {buttonStyles[idx] && 
              <button className="option-button" style={{ paddingLeft: "-10px", position: "absolute", bottom: "5px", right: "5px" }}
                onClick={() => {
                  const currCart = localStorage.getItem("cart");
                  if (!currCart) {
                    localStorage.setItem("cart", JSON.stringify([idx]));
                  }
                  else {
                    localStorage.setItem("cart", JSON.stringify([...JSON.parse(currCart), idx]));
                  }
                }}
              >
                Add
              </button>}
            </div>
            {/* Manually render the corresponding price */}
            <p className="mt-2 text-lg font-semibold">
              {productPrices[idx] ? `Price: $${productPrices[idx]}` : "No price set"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
