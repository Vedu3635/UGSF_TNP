import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Slider from "react-slick";
import "chart.js/auto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Charts = () => {
  const [filter1, setFilter1] = useState("CE");
  const [filter2, setFilter2] = useState("CE");
  const [filter3, setFilter3] = useState("CE");
  const [filter4, setFilter4] = useState("CE");

  const data = {
    CE: {
      yearlyData: [4, 6, 8, 9, 10],
      techData: [17.5, 15, 12, 14, 13],
      abroadData: [70, 30],
      placementData: [85, 15],
    },
    CSE: {
      yearlyData: [5, 7, 9, 10, 11],
      techData: [18.5, 16, 13, 15, 14],
      abroadData: [75, 25],
      placementData: [90, 10],
    },
    IT: {
      yearlyData: [3, 5, 7, 8, 9],
      techData: [16.5, 14, 11, 13, 12],
      abroadData: [65, 35],
      placementData: [80, 20],
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

  const chartData3 = {
    labels: ["Found University", "Did Not Find University"],
    datasets: [{ 
      data: data[filter3].abroadData, 
      backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"] 
    }],
  };

  const chartData4 = {
    labels: ["Placed", "Not Placed"],
    datasets: [{ 
      data: data[filter4].placementData, 
      backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(255, 205, 86, 0.6)"] 
    }],
  };

  const barChartOptions = {
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

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const charts = [
    [
      { title: "LPA vs Year", type: "bar", data: chartData1, options: barChartOptions, filter: filter1, setFilter: setFilter1 },
      { title: "LPA vs Technologies", type: "bar", data: chartData2, options: barChartOptions, filter: filter2, setFilter: setFilter2 },
    ],
    [
      { title: "Abroad Students University Placement", type: "pie", data: chartData3, options: pieChartOptions, filter: filter3, setFilter: setFilter3 },
      { title: "Student Placement", type: "pie", data: chartData4, options: pieChartOptions, filter: filter4, setFilter: setFilter4 },
    ]
  ];

  const NextArrow = ({ onClick }) => {
    return (
      <div className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer" onClick={onClick}>
        <span className="text-2xl">&#8250;</span>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
        <span className="text-2xl">&#8249;</span>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <Slider {...settings}>
        {charts.map((chartPair, index) => (
          <div key={index} className="px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chartPair.map((chart, chartIndex) => (
                <div key={chartIndex} className="bg-white p-4 rounded shadow">
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
                  <div className="h-64 w-full">
                    {chart.type === "bar" ? (
                      <Bar data={chart.data} options={chart.options} />
                    ) : (
                      <Pie data={chart.data} options={chart.options} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Charts;