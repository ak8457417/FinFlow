import { TrendingUp, Calendar } from "lucide-react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const ProfitChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    barPercentage: 0.6,
    categoryPercentage: 0.8,
  }

  const labels = ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"]

  const data = {
    labels,
    datasets: [
      {
        data: [30, 45, 29, 60, 40, 75, 85, 65, 48],
        backgroundColor: "rgba(99, 102, 241, 1)",
        borderRadius: 4,
      },
    ],
  }

  return (
    <div className="profit-chart">
      <div className="chart-header">
        <div className="chart-title-section !flex !flex-row !items-center !gap-2">
          <div className="chart-icon">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="chart-title">Total profit</h3>
          </div>
        </div>

        <button className="date-selector small">
          <Calendar size={14} />
        </button>
      </div>

      <div className="chart-value-section !flex !items-center !gap-2">
        <div className="chart-value">$144.6K</div>
        <div className="chart-change positive !py-[2px] !text-[12px] !w-[66px] !rounded-sm !px-[8px]">+25.5%</div>
      </div>

      <div className="chart-container small">
        <Bar options={options} data={data} height={120} />
      </div>

      <div className="chart-footer">
        <span className="time-period">Last 12 months</span>
        <a href="#" className="view-link">
          View report
        </a>
      </div>
    </div>
  )
}

export default ProfitChart

