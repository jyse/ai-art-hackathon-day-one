"use client";
import React, { useState, useEffect } from "react";
import "./ArtGenerator.css";

const makeRequest = async (url, method = "GET", body) => {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return response.json();
};

const ArtGenerator = () => {
  const [prompt, setPrompt] = useState("");

  async function onSubmit(e) {
    //catching the prompt
    e.preventDefault();
    console.log("Your prompt is: ", prompt);
    console.log("Your image is being generated...");

    //sending prompt to AI
    // 1. POST request that has prompt in body

    try {
      const result = await makeRequest("/api/image", "POST", { prompt });

      // if result is successful, do this
      // if not => goes to errow below
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  const handleClearClick = () => {
    // clear the prompt
  };

  return (
    <div className={"generator"}>
      <div className="inputSection">
        <div className="promptContainer">
          <div className="promptIntro">
            <h3>Prompt</h3>
            <button className="clear" onClick={() => handleClearClick()}>
              <h3>Clear</h3>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div className={"promptInput"}>
              <textarea
                className="input"
                type="text"
                placeholder="Describe the image you want to generate"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <button className="button" type="submit">
                <div className={"buttonText"}>Generate✨</div>
              </button>
            </div>
          </form>
          <div className="intro">
            <h3>Choose a starter prompt</h3>
          </div>
          <div className="cubesGrid">
            <h3>CUBE</h3>
            <h3>CUBE</h3>
            <h3>CUBE</h3>
            <h3>CUBE</h3>
          </div>
          <div className="intro">
            <h3>Choose a style</h3>
          </div>
          <div className="cubesGrid">
            <h3>StyleCube</h3>
            <h3>StyleCube</h3>
            <h3>StyleCube</h3>
            <h3>StyleCube</h3>
          </div>
        </div>
      </div>
      <div className="outputSection">
        <h1>Let's generate 🎨!</h1>
      </div>
    </div>
  );
};

export default ArtGenerator;
