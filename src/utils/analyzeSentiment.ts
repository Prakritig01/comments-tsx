import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
export const GEMINI_API_KEY = "AIzaSyB-HLxeL4BBz2g99PcBCYydTgZdxEktz_I";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeCommentSentiment(
  comment: string
): Promise<string> {
  try {
    const prompt = `
You are provided with a YouTube video comment. Your task is to:
1. Detect the language of the comment and translate it to English if necessary.
2. Analyze the comment carefully. If the comment contains even subtle positive language, return "Agree." If it contains even subtle negative language, return "Disagree." Only return "Neutral" if the comment truly lacks any positive or negative sentiment.
Return only one word: "Agree", "Disagree", or "Neutral".

Comment: "${comment}"
`;

    const result = await model.generateContent(prompt);
    const sentiment = result.response.text().trim();

    // Ensure only valid categories are returned
    const validCategories = ["Agree", "Disagree", "Neutral"];
    return validCategories.includes(sentiment) ? sentiment : "Neutral";
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Neutral"; // Default fallback
  }
}
