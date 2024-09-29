import './Create.css';
import { TextField, CircularProgress, Button } from '@mui/material';
import { useRef, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import OpenAI from "openai";
import Option from "../components/option"; 
import { OPTIONS } from "../lib/constants"; 
import { WebsiteContext } from '../App';
import ImageUpload from './ImageUpload';

function Create() {
  const { websiteData, setWebsiteData } = useContext(WebsiteContext);
  const history = useHistory();

  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_APIKEY, dangerouslyAllowBrowser: true });
  
  const promptRef = useRef();  // Use a ref for the input field
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [_, setAddress] = useState("");
  
  // Function to append options to the prompt
  const appendPrompt = (word) => {
    promptRef.current.value = promptRef.current.value.concat(", ", word);
  };

  const handleClick = async () => {
    setLoading(true);
  
    // Customize the prompt by adding hidden content
    const userPrompt = promptRef.current.value;
    const customizedPrompt = `${userPrompt}. Design a 1792x1024 background themed to this. Leave open, uncluttered space in the center of the banner.`;

    console.log(customizedPrompt);
  
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: customizedPrompt,  // Use the customized prompt
      n: 1,
      size: "1792x1024",
    });
  
    let image_url = response.data[0].url;
    setUrl(image_url);
    setLoading(false);
    setWebsiteData({
      ...websiteData,
      backgroundImage: image_url,
      primaryColor: "#000000"
    });
  };
  

  return (
    <div className="App">
      <h1 className="title">Create Your Website!</h1>

      <div className="input-container mt-2 mb-7">
        <TextField 
          label="Store name"
          variant="outlined" 
          fullWidth
          onChange={(e) => setWebsiteData({...websiteData, name: e.target.value})}
        />
      </div>
      
      {/* Input Section */}
      <div className="input-container">
        <TextField 
          label="Imagine" 
          variant="outlined" 
          fullWidth 
          inputRef={promptRef}
        />
        <Button 
          variant="contained" 
          className="generate-button" 
          onClick={handleClick}
        >
          GENERATE IMAGE
        </Button>
      </div>

      {/* Options Section */}
      <div className="options-container">
        {OPTIONS.map((option) => {
          return (
            <Option
              key={option.title}
              title={option.title}
              values={option.values}
              onAppend={appendPrompt}  // Append the option to the prompt
            />
          );
        })}
      </div>

      {/* Display generated image */}
      <div className="image-container">
        {!loading && url !== "" && <img src={url} alt="generated" className="generated-image" />}
        {loading && <CircularProgress />}
      </div>

      <ImageUpload />

      <h3 className="option-title mt-3">Set Up Midnight</h3>
      <div className="input-container mt-2 mb-7">
        <TextField 
          label="Midnight address" 
          variant="outlined" 
          fullWidth
          onChange={(e) => {
            setAddress(e.target.value);
            setWebsiteData({ ...websiteData, address: e.target.value });
          }}
        />
      </div>

      {/* {url && address && <Button  */}
      {<Button 
          variant="contained" 
          className="generate-button" 
          onClick={() => history.push("/website")}
        >
          GO TO WEBSITE!
        </Button>}
    </div>
  );
}

export default Create;
