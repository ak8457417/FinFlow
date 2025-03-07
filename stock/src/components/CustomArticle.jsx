import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { analyzeArticle } from '../services/api';

export default function CustomArticle({ url }) {
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        setLoading(true);
        const data = await analyzeArticle(url);
        setArticleData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [url]);

  if (loading) return <div className="text-center py-8">Analyzing article...</div>;
  if (error) return <div className="text-red-500 py-8">Error analyzing article: {error}</div>;
  if (!articleData) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        Custom Article Analysis
      </h2>
      
      <div className="grid md:grid-cols-[3fr,1fr] gap-6">
        <div>
          <h3 className="font-medium mb-2">Extracted Text Excerpt:</h3>
          <p className="text-gray-600">
            {articleData.text.substring(0, 1000)}...
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Sentiment Analysis</h3>
          <div className={`text-center text-2xl ${
            articleData.sentiment > 0 ? 'text-green-600' :
            articleData.sentiment < 0 ? 'text-red-600' :
            'text-gray-600'
          }`}>
            <div className="font-bold mb-2">
              {articleData.sentiment > 0 ? 'Positive' :
               articleData.sentiment < 0 ? 'Negative' : 'Neutral'}
            </div>
            <div>{articleData.sentiment.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}