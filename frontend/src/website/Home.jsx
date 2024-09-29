import '../index.css'; 
import React, { useContext, useEffect } from "react";
import { WebsiteContext } from '../App';

const Home = () => {
  const { websiteData } = useContext(WebsiteContext);
  const { productImages, productPrices } = websiteData;

  // Debugging: Check if productImages and productPrices are properly passed
  useEffect(() => {
    console.log("WebsiteContext productImages:", productImages);
    console.log("WebsiteContext productPrices:", productPrices);
  }, [websiteData]);

  return (
    <div className="text-center" style={{ backgroundColor: "#e5e5e5", color: websiteData.primaryColor }}>
      {/* Background Image */}
      <img src={"https://getwallpapers.com/wallpaper/full/8/8/b/385201.jpg"} alt="background" style={{ width: "100%" }} />

      <div style={{ position: "absolute", width: "100%", verticalAlign: "middle", top: "45%", color: websiteData.primaryColor }}>
        <h1 className="text-7xl font-serif text-center">About Us</h1>
        <p className="text-xl mt-6" style={{ color: "##285073" }}>{websiteData.description}</p>
        <button onClick={() => document.getElementById('items')?.scrollIntoView({ behavior: "smooth" })} className="rounded-full p-2 px-8 font-serif mt-8 text-xl" style={{ color: websiteData.primaryColor, backgroundColor: "#fcfeff" }}>
          SHOP NOW
        </button>
      </div>

      {/* Display Images with Corresponding Prices */}
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 p-8" id="items">
        {productImages?.map((image, idx) => (
          <div key={idx} className="relative w-full">
            <div className="relative w-full h-64 overflow-hidden">
              {/* Ensure square image */}
              <img src={image} alt={`Product ${idx + 1}`} className="object-cover w-full h-full" style={{ aspectRatio: '1 / 1' }} />
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
