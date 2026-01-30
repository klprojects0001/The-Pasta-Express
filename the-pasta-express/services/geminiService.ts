
import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFoodRecommendation = async (userInput: string) => {
  const menuContext = JSON.stringify(MENU_ITEMS.map(i => ({ 
    name: i.name, 
    desc: i.description, 
    category: i.category 
  })));

  const systemPrompt = `
    You are 'Pasta Buddy', the AI concierge for 'The Pasta Express'. 
    Your job is to recommend the perfect dish based on the user's mood, hunger level, or dietary preferences.
    Use the following menu data: ${menuContext}.
    Keep your response brief, enthusiastic, and helpful. Suggest only ONE or TWO items.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userInput,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble thinking of a dish right now. Why not try our signature Pappardelle Bolognese?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm offline for a moment, but our Cacio e Pepe is always a winner!";
  }
};
