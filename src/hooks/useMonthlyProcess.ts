import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectComments, setMonthlyDistribution } from "@/slices/linkSlice";

const useMonthlyProcess = () => {
  const dispatch = useDispatch();
  // Retrieve processed comments from Redux
  const comments = useSelector(selectComments);

  // Compute month-wise distribution using useMemo for performance
  const monthlyDistribution = useMemo(() => {
    const distribution: Record<string, number> = {};
    comments.forEach((comment) => {
      const date = new Date(comment.publishedAt);
      // Format month as a short, lowercase string (e.g., "jan", "feb", "mar")
      const monthKey = date.toLocaleString("default", { month: "short" }).toLowerCase();
      distribution[monthKey] = (distribution[monthKey] || 0) + 1;
    });
    return distribution;
  }, [comments]);

  // Store the computed distribution in the Redux slice
  useEffect(() => {
    dispatch(setMonthlyDistribution(monthlyDistribution));
  }, [monthlyDistribution, dispatch]);

  return monthlyDistribution;
};

export default useMonthlyProcess;
