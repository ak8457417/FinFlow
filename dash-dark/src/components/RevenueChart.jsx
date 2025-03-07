"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const RevenueChart = () => {
  const [dateRange, setDateRange] = useState("Jan 2024 - Dec 2024")

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          callback: (value) => {
            if (value === 0) return "0K"
            if (value === 50000) return "50K"
            if (value === 100000) return "100K"
            if (value === 150000) return "150K"
            if (value === 200000) return "200K"
            if (value === 250000) return "250K"
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
  }

  const data = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: [30000, 50000, 90000, 80000, 120000, 140000, 130000, 170000, 190000, 210000, 180000, 160000],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: [20000, 30000, 40000, 70000, 90000, 100000, 95000, 85000, 100000, 120000, 110000, 95000],
        borderColor: "rgba(52, 211, 153, 1)",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const highlightData = {
    value: "$125.2K",
    change: "+19.3%",
    date: "June 24, 2023",
  }

  return (
    <div className="revenue-chart">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3 className="chart-title">Total revenue</h3>
          <div className="chart-value">
            <span className="value">$240.8K</span>
            <span className="change positive">+20.1%</span>
          </div>
        </div>

        <div className="chart-actions">
          <div className="chart-legend">
            <span className="legend-item revenue">Revenue</span>
            <span className="legend-item expenses">Expenses</span>
          </div>

          <button className="date-selector">
            <Calendar size={14} />
            <span>{dateRange}</span>
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="highlight-point" style={{ top: "40%", left: "60%" }}>
          <div className="highlight-tooltip">
            <div className="highlight-value">{highlightData.value}</div>
            <div className="highlight-change positive">{highlightData.change}</div>
            <div className="highlight-date">{highlightData.date}</div>
          </div>
        </div>
        <Line options={options} data={data} height={300} />
      </div>
    </div>
  )
}

export default RevenueChart

