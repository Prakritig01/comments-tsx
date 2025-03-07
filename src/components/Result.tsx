import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUrl } from "@/slices/linkSlice";
import { fetchYouTubeComments } from "@/utils/ytApiConfig"; // Your function to fetch comments
import { analyzeCommentSentiment } from "@/utils/analyzeSentiment"; // Use Gemini API for sentiment
import { Loader2 } from "lucide-react"; // ShadCN recommended loading spinner

const Result = () => {
  const videoUrl = useSelector(selectCurrentUrl) || "";
  const [comments, setComments] = useState<{ text: string; sentiment: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl) return;

    const videoId = new URL(videoUrl).searchParams.get("v");
    if (!videoId) {
      console.error("Invalid YouTube URL");
      return;
    }

    const fetchAndAnalyzeComments = async () => {
      setLoading(true);
      try {
        const response = await fetchYouTubeComments(videoId); // Fetch comments
        const commentItems = response.items || [];

        const analyzedComments = await Promise.all(
          commentItems.map(async (item: any) => {
            const commentText = item.snippet.topLevelComment.snippet.textDisplay;
            const sentiment = await analyzeCommentSentiment(commentText); // Analyze sentiment
            return { text: commentText, sentiment };
          })
        );

        setComments(analyzedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzeComments();
  }, [videoUrl]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Result Page</h2>
      <p className="mb-2">Sentiment Analysis of Comments:</p>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          <span className="text-gray-500">Loading comments...</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="p-2 border rounded">
              <strong className="text-lg">{comment.sentiment}</strong>: {comment.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Result;
