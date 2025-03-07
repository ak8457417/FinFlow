import axios from 'axios';

// Mock data for development
const mockStockData = (symbol) => ({
  dates: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  }),
  prices: Array.from({ length: 30 }, () => Math.random() * 1000 + 500),
  forecast: Array.from({ length: 7 }, () => Math.random() * 1000 + 500)
});

const mockNews = (symbol) => ({
  articles: Array.from({ length: 5 }, (_, i) => ({
    title: `Latest news about ${symbol} - ${i + 1}`,
    description: `This is a mock description for ${symbol} news article ${i + 1}`,
    url: 'https://example.com',
    sentiment: Math.random() * 2 - 1 // Random sentiment between -1 and 1
  }))
});

export const getStockData = async (symbol) => {
  // In development, return mock data
  return mockStockData(symbol);
};

export const getNewsData = async (symbol) => {
  // In development, return mock data
  return mockNews(symbol);
};

export const analyzeArticle = async (url) => {
  // Mock sentiment analysis
  return {
    text: `This is a mock analysis of the article at ${url}. In a real application, this would contain the actual text extracted from the article.`,
    sentiment: Math.random() * 2 - 1 // Random sentiment between -1 and 1
  };
};