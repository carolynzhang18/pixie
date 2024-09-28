import '../index.css'; 
import { websiteData } from "./websiteData";

const Home = () => {
  return (
    <div className="text-center" style={{ backgroundColor: "#e5e5e5", color: websiteData.primaryColor }}>
      <img src={websiteData.backgroundImage} alt="" style={{ width: "100%" }} />
      <div style={{ position: "absolute", width: "100%", top: "18%", color: websiteData.primaryColor }}>
        <h1 class="text-7xl font-serif text-center">About Us</h1>
        <p className="text-xl mt-6" style={{ color: "##285073" }}>{websiteData.description}</p>
          <button onClick={() => document.getElementById('items')?.scrollIntoView({ behavior: "smooth" })} className="rounded-full p-2 px-8 font-serif mt-8 text-xl" style={{ color: websiteData.primaryColor, backgroundColor: "#fcfeff" }}>
            SHOP NOW
          </button>
      </div>
      <div class="grid grid-cols-4 gap-8 p-8" id="items">
        <div><img width="90%" src={websiteData.items[0]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[1]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[2]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[3]} alt="" /></div>
        <div><img width="90%" src={websiteData.items[0]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[1]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[2]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[3]} alt="" /></div>
        <div><img width="90%" src={websiteData.items[0]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[1]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[2]} alt="" /></div>
        <div><img width="80%" src={websiteData.items[3]} alt="" /></div>
      </div>
    </div>
  );
};

export default Home;
