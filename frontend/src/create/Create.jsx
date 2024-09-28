import './Create.css';
import { TextField, CircularProgress, Button } from '@mui/material';
import { useRef, useState } from 'react';
import OpenAI from "openai";
import Option from "../components/option"; 
import { OPTIONS } from "../lib/constants"; 

function Create() {
  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_APIKEY, dangerouslyAllowBrowser: true });
  
  const promptRef = useRef();  // Use a ref for the input field
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Function to append options to the prompt
  const appendPrompt = (word) => {
    promptRef.current.value = promptRef.current.value.concat(", ", word);
  };

  const handleClick = async () => {
    setLoading(true);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptRef.current.value,  
      n: 1,
      size: "1792x1024",
    });
    let image_url = response.data[0].url;
    setUrl(image_url);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1 className="title">Create Your Website!</h1>
      
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
    </div>
  );
}

export default Create;
