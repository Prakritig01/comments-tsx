import axios from 'axios';

export const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; 

// Function to make a GET request to YouTube API
export async function makeYouTubeAPICall(url: string, params: Record<string, any> = {}) {
    try {
      const response = await axios.get(`${YOUTUBE_BASE_URL}${url}`, {
        params: { ...params, key: API_KEY }, // Attach API key
      });
      return response.data;
    } catch (err) {
      console.error("YouTube API Error:", err);
      throw err;
    }
  }


  export async function fetchYouTubeComments(videoId: string) {
    return await makeYouTubeAPICall("/commentThreads", {
      part: "snippet",
      videoId: videoId,
      textFormat: "plainText",
      maxResults: 5, // Fetch up to 20 comments
    });
  }