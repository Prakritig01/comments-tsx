import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
export const GEMINI_API_KEY = 'AIzaSyB-HLxeL4BBz2g99PcBCYydTgZdxEktz_I';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeCommentSentiment(comment: string): Promise<string> {
    try {
        const prompt = `
        You are provided with a YouTube video comment. Your task is to perform the following steps:
        
        1. **Language Detection:** Determine the language in which the comment is written.
        2. **Translation:** If the comment is not in English, translate it accurately into English.
        3. **Sentiment Classification:** Analyze the (translated) comment and classify its sentiment based on the following criteria:
           - **"Agree":** The comment clearly supports, praises, or aligns with the video's content or message.
           - **"Disagree":** The comment clearly criticizes, opposes, or expresses negative sentiment towards the video's content.
           - **"Neutral":** The comment is ambiguous, unrelated, or does not express a clear opinion.
        
        **Important:** Return only one final result as a single word—either "Agree", "Disagree", or "Neutral". Do not include any extra explanations or commentary.
        
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