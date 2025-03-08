import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectComments, setKeywords } from "@/slices/linkSlice";

const useKeywordsProcess = () => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  // Compute the top recurring keywords using useMemo for performance.
  const keywords = useMemo(() => {
    // Define a set of common stop words to ignore.
    const stopWords = new Set([
      "the", "is", "and", "a", "an", "of", "for", "in", "to", "on", "with",
      "that", "this", "it", "i", "you", "we", "are", "was", "were", "but"
    ]);

    const keywordFrequency: Record<string, number> = {};

    // Iterate over each comment's text.
    comments.forEach((comment) => {
      const words = comment.text.split(/\W+/);
      words.forEach((word) => {
        const lowerWord = word.toLowerCase();
        // Only consider words longer than 3 characters that are not stop words.
        if (lowerWord.length > 3 && !stopWords.has(lowerWord)) {
          keywordFrequency[lowerWord] = (keywordFrequency[lowerWord] || 0) + 1;
        }
      });
    });

    // Sort keywords by frequency in descending order and take the top 10.
    const sortedKeywords = Object.entries(keywordFrequency)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([keyword]) => keyword);

    return sortedKeywords;
  }, [comments]);

  // Dispatch the computed keywords to update the Redux slice.
  useEffect(() => {
    dispatch(setKeywords(keywords));
  }, [keywords, dispatch]);

  return keywords;
};

export default useKeywordsProcess;
