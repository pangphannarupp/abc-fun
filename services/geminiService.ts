
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getFunFact(word: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Tell a 5-year-old a short, fun, one-sentence fact about "${word}". Keep it very simple and friendly.`,
      });
      return response.text || `The ${word} is very special!`;
    } catch (error) {
      console.error("Gemini Error:", error);
      return `I love the ${word}!`;
    }
  }

  async getAiMascotGreeting(userName: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a very short greeting for a child named ${userName} who is learning their ABCs. Make it enthusiastic!`,
      });
      return response.text || `Welcome back, ${userName}!`;
    } catch (error) {
      return `Let's have fun learning today!`;
    }
  }
}

export const gemini = new GeminiService();
