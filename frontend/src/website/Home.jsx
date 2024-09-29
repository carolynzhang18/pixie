import '../index.css'; 
import React, { useContext } from "react";
import { WebsiteContext } from '../App';

const Home = () => {
  const {websiteData} = useContext(WebsiteContext);

  return (
    <div className="text-center" style={{ backgroundColor: "#e5e5e5", color: websiteData.primaryColor }}>
      <img src={websiteData.backgroundImage} alt="" style={{ width: "100%" }} />
      <div style={{ position: "absolute", width: "100%", verticalAlign: "middle", top: "45%", color: websiteData.primaryColor }}>
        <h1 className="text-7xl font-serif text-center">About Us</h1>
        <p className="text-xl mt-6" style={{ color: "##285073" }}>{websiteData.description}</p>
          <button onClick={() => document.getElementById('items')?.scrollIntoView({ behavior: "smooth" })} className="rounded-full p-2 px-8 font-serif mt-8 text-xl" style={{ color: websiteData.primaryColor, backgroundColor: "#fcfeff" }}>
            SHOP NOW
          </button>
      </div>
      <div className="grid grid-cols-4 gap-8 p-8" id="items">
        {websiteData.productImages?.map((image, idx) => <div key={idx}><img src={image} alt="" /></div>)}
      </div>
    </div>
  );
};

export default Home;
