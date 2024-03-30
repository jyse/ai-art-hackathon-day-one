const fs = require("fs");
const path = require("path");
const generatedImagesPath = path.resolve("./public/images/generatedImgs/");

// something to Filesystem

export const getGenImgsFilePaths = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(generatedImagesPath, (err, files) => {
      if (err) {
        console.error("Error reading the output folder:", err);
        return;
      }
      const pngFilePaths = files.filter(
        (file) => path.extname(file).toLowerCase() === ".png"
      );
      resolve(pngFilePaths);
    });
  });
};

export async function POST(request) {
  // make connection with api
  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer sk-FXFbM5LnYaDjT0Gl89xi1qo3Bx8RvnDKiBXpQQzG58mQleKA",
    "Content-Type": "application/json"
  };

  console.log("🐲 You're here at the route: /api/image");
  // console.log("🧸 You've send this REQUEST: ", request);

  const { prompt } = await request.json();

  // prompt to API call
  const body = {
    steps: 40,
    width: 1024,
    height: 1024,
    seed: 0,
    cfg_scale: 5,
    samples: 1,
    text_prompts: [
      {
        text: prompt,
        weight: 1
      },
      {
        text: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck",
        weight: -1
      }
    ]
  };

  const response = await fetch(path, {
    headers,
    method: "POST",
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`Error response: ${errorResponse}`);
    throw new Error(`Non-200 response: ${errorResponse}`);
  }

  const responseJSON = await response.json();
  console.log(responseJSON, "WHAT IS THE RESPONSE ? 👀👀👀👀👀");

  const currentImgsFilePath = await getGenImgsFilePaths();

  const writeImages = responseJSON.artifacts.map(async (image, index) => {
    let imageFilePath = `./public/images/generatedImgs/${Date.now()}.png`;

    await fs.promises.writeFile(
      imageFilePath,
      Buffer.from(image.base64, "base64")
    );
  });

  console.log("📝Writing 🎨art to the file system - in folder generatedImgs");

  await Promise.all(writeImages);
  const newImgsFilePaths = await getGenImgsFilePaths();

  console.log("🐉🍬🔥 What prompt did we send? ", prompt);
  return new Response(
    JSON.stringify({
      message: "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🚀 Making the API CALL!✨",
      status: 200,
      imgFPs: newImgsFilePaths
    })
  );
}
