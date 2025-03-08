import { useSelector } from "react-redux";
import { selectComments, selectSentimentDistribution } from "@/slices/linkSlice";

const CommentStatistics = () => {
  // Retrieve comments and sentiment distribution from Redux
  const comments = useSelector(selectComments);
  const sentimentDistribution = useSelector(selectSentimentDistribution);

  const totalComments = comments.length;
  const { agree, disagree, neutral } = sentimentDistribution;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comment Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* First Row */}
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Total Comments</h4>
          <p className="text-2xl">{totalComments}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Agree</h4>
          <p className="text-2xl">{agree}</p>
        </div>
        {/* Second Row */}
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Disagree</h4>
          <p className="text-2xl">{disagree}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="text-lg font-semibold">Neutral</h4>
          <p className="text-2xl">{neutral}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentStatistics;
