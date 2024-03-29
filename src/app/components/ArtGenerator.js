"use client";
import React from "react";
import "./ArtGenerator.css";

const ArtGenerator = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

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
            <div className="promptInput">
              <textarea
                className="input"
                type="text"
                placeholder="Describe the image you want to generate"
                value=""
                onChange={(e) => console.log(e.target.value)}
              />
              <button className="button" type="submit">
                <div className="buttonText">Generate✨</div>
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
