import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Charts = () => {
  const chartData1 = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [{ label: "LPA", data: [4, 6, 8, 9, 10], backgroundColor: "rgba(54, 162, 235, 0.6)" }],
  };

  const chartData2 = {
    labels: ["Machine Learning", "Full Stack Developer", "Data Scientist", "Cloud Computing", "DevOps"],
    datasets: [{ label: "LPA", data: [17.5, 15, 12, 14, 13], backgroundColor: "rgba(255, 99, 132, 0.6)" }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 6,
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      {[
        { title: "LPA vs Year", data: chartData1 },
        { title: "LPA vs Technologies", data: chartData2 },
      ].map((chart, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">{chart.title}</h3>
          <div className="h-80 w-full">
            <Bar data={chart.data} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Charts;