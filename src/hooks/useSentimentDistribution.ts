import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectComments } from "@/slices/linkSlice";

const useSentimentDistribution = () => {
  // Retrieve processed comments from Redux
  const comments = useSelector(selectComments);

  // Compute sentiment distribution using useMemo for performance
  const sentimentDistribution = useMemo(() => {
    return comments.reduce(
      (acc, comment) => {
        const sentiment = comment.sentiment.toLowerCase();
        if (sentiment === "agree") {
          acc.agree += 1;
        } else if (sentiment === "disagree") {
          acc.disagree += 1;
        } else {
          acc.neutral += 1;
        }
        return acc;
      },
      { agree: 0, disagree: 0, neutral: 0 }
    );
  }, [comments]);

  return sentimentDistribution;
};

export default useSentimentDistribution;
