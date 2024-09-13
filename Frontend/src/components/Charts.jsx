import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Charts = () => {
  const [filter1, setFilter1] = useState("CE");
  const [filter2, setFilter2] = useState("CE");

  const data = {
    CE: {
      yearlyData: [4, 6, 8, 9, 10],
      techData: [17.5, 15, 12, 14, 13],
    },
    CSE: {
      yearlyData: [5, 7, 9, 10, 11],
      techData: [18.5, 16, 13, 15, 14],
    },
    IT: {
      yearlyData: [3, 5, 7, 8, 9],
      techData: [16.5, 14, 11, 13, 12],
    },
  };

  const chartData1 = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [{ 
      label: "LPA", 
      data: data[filter1].yearlyData, 
      backgroundColor: "rgba(54, 162, 235, 0.6)" 
    }],
  };

  const chartData2 = {
    labels: ["Machine Learning", "Full Stack Developer", "Data Scientist", "Cloud Computing", "DevOps"],
    datasets: [{ 
      label: "LPA", 
      data: data[filter2].techData, 
      backgroundColor: "rgba(255, 99, 132, 0.6)" 
    }],
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
        { title: "LPA vs Year", data: chartData1, filter: filter1, setFilter: setFilter1 },
        { title: "LPA vs Technologies", data: chartData2, filter: filter2, setFilter: setFilter2 },
      ].map((chart, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">{chart.title}</h3>
            <select
              value={chart.filter}
              onChange={(e) => chart.setFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="CE">CE</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <Bar data={chart.data} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Charts;