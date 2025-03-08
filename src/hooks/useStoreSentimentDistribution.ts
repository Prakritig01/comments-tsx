import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, setSentimentDistribution } from "@/slices/linkSlice";

const useStoreSentimentDistribution = () => {
  const dispatch = useDispatch();
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

  // Update the Redux store with the computed sentiment distribution
  useEffect(() => {
    dispatch(setSentimentDistribution(sentimentDistribution));
  }, [sentimentDistribution, dispatch]);

  return sentimentDistribution;
};

export default useStoreSentimentDistribution;
