import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUrl,
  selectComments,
  setComments as setReduxComments,
} from "@/slices/linkSlice";
import { fetchYouTubeComments } from "@/utils/ytApiConfig"; // Your function to fetch comments
import { analyzeCommentSentiment } from "@/utils/analyzeSentiment"; // Use Gemini API for sentiment
import { Loader2 } from "lucide-react"; // ShadCN recommended loading spinner
import useMonthlyProcess from "@/hooks/useMonthlyProcess"; // Custom hook for monthly distribution
import useStoreSentimentDistribution from "@/hooks/useStoreSentimentDistribution"; // Custom hook for sentiment distribution
import SentimentProgress from "./SentimentProgress";
import CommentStatistics from "./CommentStatistics";
import MonthlyDistribution from "./MonthlyDistribution";

const Result = () => {
  const dispatch = useDispatch();
  const videoUrl = useSelector(selectCurrentUrl) || "";
  const [loading, setLoading] = useState(false);

  // Call the custom hooks:
  // This one computes and stores monthly distribution in Redux.
  const monthlyDistribution = useMonthlyProcess();
  // This hook computes and stores sentiment distribution in Redux.
  const sentimentDistribution = useStoreSentimentDistribution();

  useEffect(() => {
    if (!videoUrl) return;

    // Ensure the URL is valid by checking if it starts with 'http'
    const safeUrl = videoUrl.startsWith("http")
      ? videoUrl
      : `https://${videoUrl}`;
    let videoId: string | null = null;
    try {
      const urlObj = new URL(safeUrl);
      // Try extracting the 'v' parameter
      videoId = urlObj.searchParams.get("v");

      // If 'v' is not found, check if the URL is in youtu.be format
      if (!videoId && urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1); // Remove leading slash
      }
    } catch (error) {
      console.error("Invalid URL provided:", safeUrl);
      return;
    }

    if (!videoId) {
      console.error(
        "Invalid YouTube URL: cannot extract video ID from",
        safeUrl
      );
      return;
    }

    const fetchAndAnalyzeComments = async () => {
      setLoading(true);
      try {
        const response = await fetchYouTubeComments(videoId);
        const commentItems = response.items || [];

        // Process each comment to extract necessary fields and compute sentiment
        const processedComments = await Promise.all(
          commentItems.map(async (item: any) => {
            const snippet = item.snippet.topLevelComment.snippet;
            const commentText = snippet.textDisplay;
            const sentiment = await analyzeCommentSentiment(commentText);
            return {
              username: snippet.authorDisplayName,
              text: commentText,
              videoId: snippet.videoId,
              publishedAt: snippet.publishedAt,
              sentiment,
            };
          })
        );

        // Dispatch processed comments to Redux store
        dispatch(setReduxComments(processedComments));
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzeComments();
  }, [videoUrl, dispatch]);

  // Retrieve processed comments from Redux for display
  const comments = useSelector(selectComments);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Result Page</h2>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          <span className="text-gray-500">Loading comments...</span>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-xl font-semibold">
              Monthly Comment Distribution
            </h3>
            <ul className="space-y-1">
              {Object.entries(monthlyDistribution).map(([month, count]) => (
                <li key={month}>
                  <span className="font-bold">{month.toUpperCase()}</span>:{" "}
                  {count} comments
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Sentiment Distribution</h3>
            <ul className="space-y-1">
              <li>
                <strong>Agree:</strong> {sentimentDistribution.agree}
              </li>
              <li>
                <strong>Disagree:</strong> {sentimentDistribution.disagree}
              </li>
              <li>
                <strong>Neutral:</strong> {sentimentDistribution.neutral}
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              Sentiment Analysis of Comments
            </h3>
            <ul className="space-y-2">
              {comments.map((comment, index) => (
                <li key={index} className="p-2 border rounded">
                  <strong className="text-lg">{comment.sentiment}</strong> by{" "}
                  {comment.username} on{" "}
                  {new Date(comment.publishedAt).toLocaleDateString()} -{" "}
                  {comment.text}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mt-4">
        <SentimentProgress />
      </div>
      <div className="mt-4">
        <CommentStatistics/>
      </div>
      <div className="mt-4">
        <MonthlyDistribution/>
      </div>
    </div>
  );
};

export default Result;
