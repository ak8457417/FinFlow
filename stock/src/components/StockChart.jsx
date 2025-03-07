import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getStockData } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ stockSymbol }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStockData(stockSymbol);
        
        setChartData({
          labels: data.dates,
          datasets: [
            {
              label: 'Historical Prices',
              data: data.prices,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Forecast',
              data: [...Array(23).fill(null), ...data.forecast],
              borderColor: 'rgb(255, 99, 132)',
              borderDash: [5, 5],
              tension: 0.1
            }
          ]
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stockSymbol]);

  if (loading) return <div className="text-center py-8">Loading chart data...</div>;
  if (error) return <div className="text-red-500 py-8">Error loading chart: {error}</div>;
  if (!chartData) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Price Analysis & Forecast</h2>
      <div className="h-[400px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `${stockSymbol} Price Prediction`
              }
            }
          }}
        />
      </div>
    </div>
  );
}