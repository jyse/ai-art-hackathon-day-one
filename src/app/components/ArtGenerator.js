"use client";
import React, { useState, useEffect } from "react";
import "./ArtGenerator.css";
import Image from "next/image";
import spObjects from "../../../public/JSON/sps.json";
import styleNames from "../../../public/JSON/styles.json";

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
  const [randomSps, setRandomSps] = useState([]);
  const [randomStyles, setRandomStyles] = useState([]);
  const [chosenStyle, setChosenStyle] = useState("");

  const truncateItem = (text, maxLength = 10) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const getRandomSp = () => {
    let randomSps = [];

    for (let i = 0; i < 4; i++) {
      randomSps.push(spObjects[Math.floor(Math.random() * spObjects.length)]);
    }
    return randomSps;
  };

  const getRandomStyles = () => {
    let random = styleNames.map((styleName) => {
      let filtered = spObjects.filter((item) => item.style === styleName);
      let randomSelectedStyles =
        filtered[Math.floor(Math.random() * filtered.length)];
      return randomSelectedStyles;
    });
    return random;
  };

  const handleStarterPrompt = (starterPrompt) => {
    setPrompt(starterPrompt);
  };

  const handleStyleSelection = (style) => {
    console.log("Chosen style: ", style);
    setChosenStyle(style);

    setPrompt((currentPrompt) =>
      currentPrompt ? `${currentPrompt}, ${style}` : `${style},`
    );
  };

  async function onSubmit(e) {
    //catching the prompt
    e.preventDefault();
    console.log("Your prompt is: ", prompt);
    console.log("Your image is being 🤖generated...");

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

  useEffect(() => {
    let spsResult = getRandomSp();
    let stylesResult = getRandomStyles();

    console.log(spsResult, "what is in spsResulte? 🐲🐲🐲🐲🐲");
    setRandomSps(spsResult);
    setRandomStyles(stylesResult);
  }, []);

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
            {randomSps?.map((item, index) => {
              return (
                <div
                  className="styleCubeWrapper"
                  key={index}
                  onClick={() => handleStarterPrompt(item.prompt)}
                >
                  <Image
                    width={120}
                    height={120}
                    borderRadius={3}
                    src={item.imageFile}
                    style={styleCube}
                    alt={`${index}.png`}
                  />
                  <div className="overlay">
                    <p>{truncateItem(item?.prompt, 25)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="intro">
            <h3>Choose a style</h3>
          </div>
          <div className="cubesGrid">
            {randomStyles.map((item, index) => {
              return (
                <div
                  className="styleCubeWrapper"
                  key={index}
                  onClick={() => handleStyleSelection(item.style)}
                >
                  <Image
                    width={120}
                    height={120}
                    borderRadius={3}
                    src={item.imageFile}
                    style={styleCube}
                    alt={`${index}.png`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="outputSection">
        <div className="imgDetails">
          {genImg ? (
            <>
              <Image
                priority={true}
                height={250}
                width={250}
                src={`/images/generatedImgs/${getImgFp}`}
                style={styleCube}
                alt={`/${getImgFp}`}
              />
              <div className={"promptDescription"}>
                <p>{truncateItem(finalPrompt, 25)}</p>
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
