import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Slider from "react-slick";
import "chart.js/auto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Charts = () => {
  const [filter1, setFilter1] = useState("CE");
  const [filter2, setFilter2] = useState("CE");
  const [filter3, setFilter3] = useState("CE");
  const [filter4, setFilter4] = useState("CE");
  const [filter5, setFilter5] = useState("CE");

  const data = {
    CE: {
      yearlyData: [4, 6, 8, 9, 10],
      techData: [17.5, 15, 12, 14, 13],
      abroadData: [70, 30],
      placementData: [25, 55],
      studentsChoiceData: {
        placement: [60, 65, 70, 75, 80],
        higherStudies: [40, 35, 30, 25, 20],
      },
    },
    CSE: {
      yearlyData: [5, 7, 9, 10, 11],
      techData: [18.5, 16, 13, 15, 14],
      abroadData: [75, 25],
      placementData: [20, 50],
      studentsChoiceData: {
        placement: [65, 70, 75, 80, 85],
        higherStudies: [35, 30, 25, 20, 15],
      },
    },
    IT: {
      yearlyData: [3, 5, 7, 8, 9],
      techData: [16.5, 14, 11, 13, 12],
      abroadData: [65, 35],
      placementData: [22, 45],
      studentsChoiceData: {
        placement: [55, 60, 65, 70, 75],
        higherStudies: [45, 40, 35, 30, 25],
      },
    },
  };

  const chartData1 = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "LPA",
        data: data[filter1].yearlyData,
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
    ],
    datasets: [
      {
        label: "LPA",
        data: data[filter2].techData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartData3 = {
    labels: ["Found University", "Did Not Find University"],
    datasets: [
      {
        data: data[filter3].abroadData,
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
      },
    ],
  };

  const chartData4 = {
    labels: ["Placed", "Not Placed"],
    datasets: [
      {
        data: data[filter4].placementData,
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
      },
    ],
  };

  const chartData5 = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Placement",
        data: data[filter5].studentsChoiceData.placement,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Higher Studies",
        data: data[filter5].studentsChoiceData.higherStudies,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
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
        position: "bottom",
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        title: {
          display: true,
          text: "Percentage of Students",
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.parsed.y + "%";
          },
        },
      },
      title: {
        display: true,
        text: 'Students Opting for Placement vs Higher Studies',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };

  const charts = [
    {
      title: "LPA vs Year",
      type: "bar",
      data: chartData1,
      options: barChartOptions,
      filter: filter1,
      setFilter: setFilter1,
    },
    {
      title: "LPA vs Technologies",
      type: "bar",
      data: chartData2,
      options: barChartOptions,
      filter: filter2,
      setFilter: setFilter2,
    },
    {
      title: "Abroad Students University Placement",
      type: "pie",
      data: chartData3,
      options: pieChartOptions,
      filter: filter3,
      setFilter: setFilter3,
    },
    {
      title: "Student Placement",
      type: "pie",
      data: chartData4,
      options: pieChartOptions,
      filter: filter4,
      setFilter: setFilter4,
    },
    {
      title: "Students Opting for Placement vs Higher Studies",
      type: "line",
      data: chartData5,
      options: lineChartOptions,
      filter: filter5,
      setFilter: setFilter5,
    },
  ];

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onClick}
      >
        <span className="text-2xl">&#8250;</span>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <span className="text-2xl">&#8249;</span>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const DepartmentSelector = ({ value, onChange }) => {
    const departments = ["CE", "CSE", "IT"];
    return (
      <div className="flex space-x-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => onChange(dept)}
            className={`px-3 py-1 rounded ${
              value === dept
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 hover:text-white transition-colors`}
          >
            {dept}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto my-8 px-0">
      <Slider {...settings}>
        {charts.map((chart, index) => (
          <div key={index} className="px-4">
            <div className="bg-white p-4 rounded shadow h-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h3 className="text-lg font-bold">{chart.title}</h3>
                <DepartmentSelector
                  value={chart.filter}
                  onChange={chart.setFilter}
                />
              </div>
              <div className="h-64 w-full">
                {chart.type === "bar" ? (
                  <Bar data={chart.data} options={chart.options} />
                ) : chart.type === "pie" ? (
                  <Pie data={chart.data} options={chart.options} />
                ) : (
                  <Line data={chart.data} options={chart.options} />
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Charts;