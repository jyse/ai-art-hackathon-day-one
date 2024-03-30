"use client";
import React, { useState, useEffect } from "react";
import "./ArtGenerator.css";
import Image from "next/image";

const styleCube = {
  borderRadius: "6px",
  alignSelf: "center",
  objectFit: "contain"
};

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
  const [genImg, setGenImg] = useState(false);
  const [getImgFp, setGenImgFP] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");

  const truncateItem = (text, maxLength = 10) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  async function onSubmit(e) {
    //catching the prompt
    e.preventDefault();
    console.log("Your prompt is: ", prompt);
    console.log("Your image is being 🤖generated...");

    //sending prompt to AI
    // 1. POST request that has prompt in body

    try {
      console.log("🚀 Making request to /api/image");
      const result = await makeRequest("/api/image", "POST", { prompt });

      console.log(result, "what is in result 🔥🌻 ");
      if (result.status) {
        console.log("🎨🤖 Art is generated");
        setGenImg(true);
        setGenImgFP(result.imgFPs[result.imgFPs.length - 1]);
        setFinalPrompt(prompt);
      }
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
        <div className="imgDetails">
          {genImg ? (
            <>
              <Image
                width={400}
                height={400}
                src={`/images/generatedImgs/${getImgFp}`}
                style={styleCube}
                alt={`/${getImgFp}`}
              />
              <div className={"promptDescription"}>
                <p>{truncateItem(finalPrompt, 50)}</p>
              </div>
            </>
          ) : (
            <div className="start-generate">
              <h1>Let's generate 🎨!</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtGenerator;
