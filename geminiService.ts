
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { RoseColor, RoseMessage } from "./types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRoseDayContent = async (name: string, relation: string, color: RoseColor): Promise<RoseMessage> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a beautiful Rose Day greeting for ${name} who is my ${relation}. They are being given a ${color} rose. 
               Provide the response in JSON format with three fields:
               1. 'text': A sweet 1-2 sentence greeting.
               2. 'poem': A short 4-line poetic verse about roses and love/friendship.
               3. 'roseMeaning': A short explanation of what a ${color} rose signifies.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          poem: { type: Type.STRING },
          roseMeaning: { type: Type.STRING }
        },
        required: ["text", "poem", "roseMeaning"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateRoseImage = async (color: RoseColor): Promise<string | null> => {
  const ai = getAI();
  const prompt = `An incredibly beautiful, high-quality, close-up photograph of a single ${color} rose with dew drops on its petals, soft romantic lighting, pastel background, extremely aesthetic, 4k.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image generation failed", error);
  }
  return null;
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this sweetly: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    }
  } catch (error) {
    console.error("Speech generation failed", error);
  }
  return null;
};
