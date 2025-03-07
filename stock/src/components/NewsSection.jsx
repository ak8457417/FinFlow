import { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { getNewsData } from '../services/api';

export default function NewsSection({ stockSymbol }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNewsData(stockSymbol);
        setNews(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [stockSymbol]);

  if (loading) return <div className="text-center py-8">Loading news...</div>;
  if (error) return <div className="text-red-500 py-8">Error loading news: {error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Newspaper className="w-6 h-6" />
        Latest News
      </h2>
      <div className="space-y-4">
        {news.map((article, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="font-semibold mb-2">{article.title}</h4>
            <p className="text-gray-600 mb-2">{article.description}</p>
            <div className="flex justify-between items-center">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read full article
              </a>
              <span className={`px-3 py-1 rounded-full text-sm ${
                article.sentiment > 0 ? 'bg-green-100 text-green-800' :
                article.sentiment < 0 ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {article.sentiment > 0 ? 'Positive' :
                 article.sentiment < 0 ? 'Negative' : 'Neutral'}
                ({article.sentiment.toFixed(2)})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}