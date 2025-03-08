import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  selectCurrentUrl,
  setComments as setReduxComments,
} from "@/slices/linkSlice";
import { fetchYouTubeComments } from "@/utils/ytApiConfig";
import { analyzeCommentSentiment } from "@/utils/analyzeSentiment";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import ShadCN Button
import useMonthlyProcess from "@/hooks/useMonthlyProcess";
import useStoreSentimentDistribution from "@/hooks/useStoreSentimentDistribution";
import useKeywordsProcess from "@/hooks/useKeywordProcess";
import SentimentProgress from "./SentimentProgress";
import CommentStatistics from "./CommentStatistics";
import MonthlyDistribution from "./MonthlyDistribution";
import KeywordsDisplay from "./KeywordDisplay";

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const videoUrl = useSelector(selectCurrentUrl) || "";
  const [loading, setLoading] = useState(false);

  useMonthlyProcess();
  useStoreSentimentDistribution();
  useKeywordsProcess();

  useEffect(() => {
    if (!videoUrl) return;

    const safeUrl = videoUrl.startsWith("http")
      ? videoUrl
      : `https://${videoUrl}`;
    let videoId: string | null = null;
    try {
      const urlObj = new URL(safeUrl);
      videoId = urlObj.searchParams.get("v");
      if (!videoId && urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }
    } catch (error) {
      console.error("Invalid URL provided:", safeUrl);
      return;
    }

    if (!videoId) {
      console.error("Invalid YouTube URL:", safeUrl);
      return;
    }

    const fetchAndAnalyzeComments = async () => {
      setLoading(true);
      try {
        const response = await fetchYouTubeComments(videoId);
        const commentItems = response.items || [];

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

        dispatch(setReduxComments(processedComments));
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyzeComments();
  }, [videoUrl, dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Result Page</h2>
        <Button variant="outline" onClick={() => navigate("/")}>
          ← Back
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          <span className="text-gray-500">Loading comments...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SentimentProgress />
          <CommentStatistics />
          <MonthlyDistribution />
          <KeywordsDisplay />
        </div>
      )}
    </div>
  );
};

export default Result;
