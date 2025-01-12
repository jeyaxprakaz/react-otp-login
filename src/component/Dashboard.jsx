import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Footer from "./Footer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // For Pie Chart
} from "chart.js";
import Sidebar from "./Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Visitors",
        data: [100, 200, 150, 300, 250],
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Others"],
    datasets: [
      {
        data: [55, 25, 10, 7, 3],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <Header />
    <Sidebar>
      <div className="mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Visitor Trends</h5>
                <Line data={lineData} options={options} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Visitor Trends</h5>
                <Line data={lineData} options={options} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Browser Usage</h5>
                <Pie data={pieData} options={options} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sales Data</h5>
                <Bar data={barData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
    <Footer />
    </div>
  );
};

export default Dashboard;
