import { Activity } from "lucide-react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

const SessionsChart = () => {
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
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          font: {
            size: 10,
          },
          stepSize: 50,
        },
        min: 0,
        max: 150,
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
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
  }

  const labels = ["0", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 PM"]

  const data = {
    labels,
    datasets: [
      {
        data: [20, 40, 30, 70, 50, 60, 120, 80, 40],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        fill: false,
      },
    ],
  }

  return (
    <div className="sessions-chart">
      <div className="chart-header">
        <div className="chart-title-section !flex !flex-row !items-center !gap-2">
          <div className="chart-icon">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="chart-title">Total sessions</h3>
          </div>
        </div>
      </div>

      <div className="chart-value-section !flex !items-center !gap-2">
        <div className="chart-value">400</div>
        <div className="chart-change positive !py-[2px] !text-[12px] !w-[66px] !rounded-sm !px-[8px]">+16.5%</div>
      </div>

      <div className="chart-container small">
        <Line options={options} data={data} height={120} />
      </div>

      <div className="chart-footer">
        <div className="visitors-count">
          <span className="change positive">+3.5%</span>
          <span className="count">10k visitors</span>
        </div>
        <a href="#" className="view-link">
          View report
        </a>
      </div>
    </div>
  )
}

export default SessionsChart

