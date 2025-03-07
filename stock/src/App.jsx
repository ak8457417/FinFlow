import { useState } from 'react';
import { LineChart } from 'lucide-react';
import { stocks } from './constants/stocks';
import StockChart from './components/StockChart';
import NewsSection from './components/NewsSection';
import CustomArticle from './components/CustomArticle';

function App() {
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [customArticleUrl, setCustomArticleUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
  };

  return (
    <div className="min-h-screen bg-[#080f26] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl text-white font-bold mb-8 flex items-center gap-2">
          <LineChart className="w-10 h-10" />
          Stock Analyzer with News Insights
        </h1>

        <div className="grid gap-6">
          <div className="bg-[#101936] p-6 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Select a Stock:
                </label>
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {stocks.map(stock => (
                    <option key={stock} value={stock}>{stock}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Analyze Custom Article (URL):
                </label>
                <input
                  type="url"
                  value={customArticleUrl}
                  onChange={(e) => setCustomArticleUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Analyze
            </button>
          </div>

          {isAnalyzing && (
            <>
              <StockChart stockSymbol={selectedStock} />
              <NewsSection stockSymbol={selectedStock} />
              {customArticleUrl && <CustomArticle url={customArticleUrl} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;