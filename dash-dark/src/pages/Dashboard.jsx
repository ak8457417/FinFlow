import React from 'react';
import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import MetricCard from "../components/MetricCard.jsx";
import RevenueChart from "../components/RevenueChart.jsx";
import ProfitChart from "../components/ProfitChart.jsx";
import SessionsChart from "../components/SessionsChart.jsx";
import ReportsOverview from "../components/ReportsOverview.jsx";
import RecentOrders from "../components/RecentOrders.jsx";

const Dashboard = () => {
    return (
        <div>
            <div className="app">
                <main className="main-content">
                    <DashboardHeader />

                    <div className="metrics-grid">
                        <MetricCard icon="eye" title="Total Amount" value="80.8K" change="+6.4%" isPositive={true} />
                        <MetricCard icon="users" title="Pending" value="23.6K" change="-12.5%" isPositive={false} />
                        <MetricCard icon="user-plus" title="Saved" value="75.6" change="+21.3%" isPositive={true} />
                        <MetricCard icon="star" title="Revenue" value="2.3K" change="+13.9%" isPositive={true} />
                    </div>

                    <div className="charts-grid">
                        <div className="revenue-chart-container">
                            <RevenueChart />
                        </div>
                        <div className="side-charts">
                            <ProfitChart />
                            <SessionsChart />
                        </div>
                    </div>

                    <div className="reports-section">
                        <ReportsOverview />
                    </div>

                    <div className="orders-section">
                        <RecentOrders />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
