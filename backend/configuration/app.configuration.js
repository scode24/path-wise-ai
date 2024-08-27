import { GoogleGenerativeAI } from "@google/generative-ai";

let apiKey;
let genAI;
let model;
let generationConfig;

const appConfigInit = () => {
  apiKey = process.env.GEMINI_API_KEY;
  genAI = new GoogleGenerativeAI(apiKey);

  model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'I want to learn something, give me step by step list of topics to cover in following JSON schema [{topic:"", shortDescription:"", detailedDescription:""}]',
  });

  generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
};

export { appConfigInit, generationConfig, model };
