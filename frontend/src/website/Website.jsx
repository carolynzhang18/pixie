import Home from "./Home";
import React from "react";
import { useHistory } from "react-router-dom";

const Website = () => {
  const history = useHistory();

  return (
    <>
      <header className="px-4 font-serif text-xl" role="group" style={{ position: "absolute", top: "5%", width: "100%" }}>
        <button style={{ position: "absolute", left: "3%" }} onClick={() => { history.push("/website/") }}>HOME</button>
        <div role="group" style={{ position: "absolute", right: "3%" }}>
          <button className="mx-10" onClick={() => history.push("/website/buy")}>BUY</button>
          <button onClick={() => history.push("/website/contact")}>CONTACT</button>
        </div>
      </header>

      {/* Render the Home component */}
      <Home />
    </>
  );
};

export default Website;
