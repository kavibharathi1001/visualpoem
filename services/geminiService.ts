import { GoogleGenAI } from "@google/genai";
import { PoemOptionsState, PoemMode } from "../types";
import { PROMPT_TEMPLATES } from "../constants";

// Using gemini-2.5-flash for better stability, speed, and reliability
const MODEL_NAME = "gemini-2.5-flash";

export const generatePoem = async (
  imageBase64: string,
  mimeType: string,
  options: PoemOptionsState
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let promptText = "";

  switch (options.mode) {
    case PoemMode.GENERAL:
      promptText = PROMPT_TEMPLATES[PoemMode.GENERAL];
      break;
    case PoemMode.STYLE:
      promptText = PROMPT_TEMPLATES[PoemMode.STYLE](options.form);
      break;
    case PoemMode.NARRATIVE:
      promptText = PROMPT_TEMPLATES[PoemMode.NARRATIVE](options.tone);
      break;
    case PoemMode.BEST:
    default:
      promptText = PROMPT_TEMPLATES[PoemMode.BEST];
      break;
  }

  if (options.customTopic && options.customTopic.trim() !== "") {
    promptText += `\n\nAdditionally, incorporate the following theme or element: ${options.customTopic}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction: "You are a world-class poet. Your output should be purely the poem itself, possibly with a title at the top in bold (markdown format), but do not include conversational filler like 'Here is the poem'.",
        temperature: 0.8, // Slightly higher creative freedom
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "No poem generated. Please try again.";
  } catch (error) {
    console.error("Error generating poem:", error);
    throw error;
  }
};