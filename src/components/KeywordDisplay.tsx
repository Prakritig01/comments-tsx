// KeywordsDisplay.tsx
import { useSelector } from 'react-redux';
import { selectKeywords } from '@/slices/linkSlice';

const KeywordsDisplay = () => {
  const keywords = useSelector(selectKeywords);

  if (keywords.length === 0) {
    return <div className="text-gray-500">No keywords found.</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-800"
          >
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsDisplay;
