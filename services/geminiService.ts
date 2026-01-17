
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const chatWithAI = async (history: Message[], userInput: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are a professional Civil Engineering Assistant. 
    Help users with calculations, structural design concepts, material estimation, and site management.
    Provide precise formulas and standards (IS Codes, ACI, Eurocodes) when applicable.
    Your tone should be professional and technical.
    If asked about a specific calculator in our app, guide them to use it.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently unavailable. Please try again later.";
  }
};
