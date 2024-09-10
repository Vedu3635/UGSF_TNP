import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Charts = () => {
  const chartData1 = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "LPA",
        data: [4, 6, 8, 9, 10],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartData2 = {
    labels: [
      "Machine Learning",
      "Full Stack Developer",
      "Data Scientist",
      "Cloud Computing",
      "DevOps",
      "Data Analyst",
      "Cybersecurity",
      "Mobile App Development",
      "Software Testing",
    ],
    datasets: [
      {
        label: "LPA",
        data: [17.5, 15, 12, 14, 13, 10, 11, 9, 8],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">LPA vs Year</h3>
        <Bar data={chartData1} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">LPA vs Technologies</h3>
        <Bar data={chartData2} />
      </div>
    </div>
  );
};

export default Charts;
