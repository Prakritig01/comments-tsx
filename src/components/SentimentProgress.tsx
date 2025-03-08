// SentimentProgress.tsx
import { useSelector } from 'react-redux';
import { selectSentimentDistribution } from '@/slices/linkSlice';

const SentimentProgress = () => {
  const { agree, disagree, neutral } = useSelector(selectSentimentDistribution);
  const total = agree + disagree + neutral;

  // Calculate percentage for each sentiment, with a safeguard against division by zero
  const agreePercentage = total > 0 ? Math.round((agree / total) * 100) : 0;
  const disagreePercentage = total > 0 ? Math.round((disagree / total) * 100) : 0;
  const neutralPercentage = total > 0 ? Math.round((neutral / total) * 100) : 0;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Sentiment Analysis Progress</h3>
      <div className="space-y-4">
        {/* Agree Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Agree</span>
            <span className="text-sm font-medium text-gray-700">
              {agree} votes ({agreePercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${agreePercentage}%` }}
            ></div>
          </div>
        </div>
        {/* Disagree Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Disagree</span>
            <span className="text-sm font-medium text-gray-700">
              {disagree} votes ({disagreePercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${disagreePercentage}%` }}
            ></div>
          </div>
        </div>
        {/* Neutral Progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Neutral</span>
            <span className="text-sm font-medium text-gray-700">
              {neutral} votes ({neutralPercentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-yellow-500 h-4 rounded-full"
              style={{ width: `${neutralPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentProgress;
