import React, { useState, useEffect, useMemo } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Slider from "react-slick";
import "chart.js/auto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Charts = ({ allStudentsData, placementData, higherStudiesData }) => {
  const [students, setStudents] = useState({
    CE: [],
    IT: [],
    CSE: [],
  });

  // console.log(allStudentsData);
  // console.log(placementData);
  // console.log(higherStudiesData);
  // console.log(typeof studentsData);

  const [filter1, setFilter1] = useState("CE");
  const [filter2, setFilter2] = useState("CE");
  const [filter3, setFilter3] = useState("CE");
  const [filter4, setFilter4] = useState("CE");
  const [filter5, setFilter5] = useState("CE");

  useEffect(() => {
    // Categorize students into departments based on the passed prop data
    const categorizedStudents = allStudentsData.reduce(
      (acc, student) => {
        if (student.Program === "CE") {
          acc.CE.push(student);
        } else if (student.Program === "IT") {
          acc.IT.push(student);
        } else if (student.Program === "CSE") {
          acc.CSE.push(student);
        }
        return acc;
      },
      { CE: [], IT: [], CSE: [] }
    );

    setStudents(categorizedStudents);
  }, [allStudentsData]);

  // Helper function to get student counts by career choice
  const getStudentCountsByCareerChoice = (careerChoice) => {
    return allStudentsData.filter(
      (student) => student.Career_Choice === careerChoice
    ).length;
  };

  // Helper function to get data for each department
  const getDepartmentData = (department) => {
    const departmentStudents = allStudentsData.filter(
      (student) => student.Program === department
    );
    const placementCount = departmentStudents.filter(
      (student) => student.Career_Choice === "Job Placement"
    ).length;
    const higherStudiesCount = departmentStudents.filter(
      (student) => student.Career_Choice === "Higher Studies"
    ).length;
    const entrepreneurialCount = departmentStudents.filter(
      (student) => student.Career_Choice === "Entrepreneurial Venture"
    ).length;

    return {
      placementCount,
      higherStudiesCount,
      entrepreneurialCount,
    };
  };

  const years1 = [
    ...new Set(placementData.map((student) => student.year)),
  ].sort();

  // Filter and prepare chart data based on the selected program
  const filteredData1 = placementData.filter(
    (student) => student.Program === filter1
  );

  // Prepare chartData1
  const chartData1 = {
    labels: years1,
    datasets: [
      {
        label: filter1, // Dynamically change label based on selected program
        data: years1.map((year) => {
          const studentsInYearAndProgram = filteredData1.filter(
            (student) => student.year === year
          );
          return studentsInYearAndProgram.length > 0
            ? Math.max(
                ...studentsInYearAndProgram.map(
                  (student) => student.package / 100000
                )
              )
            : 0; // If no student data for that year and program, return 0
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Customize per program if needed
      },
    ],
  };

  //chart 2

  const countPositions = (data) => {
    const positionCounts = data.reduce((acc, { position }) => {
      acc[position] = (acc[position] || 0) + 1;
      return acc;
    }, {});

    // Sort positions by count in descending order and take the top 5
    return Object.entries(positionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5
  };

  // Filter the placementData based on the selected program

  const filteredPlacementData = useMemo(() => {
    const filteredData = placementData.filter(
      (student) => student.Program === filter2
    );
    // Log filtered data to check if it's correct
    return filteredData;
  }, [filter2, placementData]);

  // Calculate top positions for the filtered program
  const topPositions = useMemo(
    () => countPositions(filteredPlacementData),
    [filteredPlacementData]
  );

  // Prepare chartData2 with dynamic labels based on filtered program
  const chartData2 = {
    labels: topPositions.map(([position]) => position), // Position names as labels
    datasets: [
      {
        data: topPositions.map(([, count]) => count), // Counts for the positions
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  //chart 3

  // Function to get students filtered by a specific program (department)

  const filteredData3 = higherStudiesData.filter((student) => {
    return student.Program === filter3;
  });

  // Function to group students by their status (found university or not)
  const countStudentsByProgram = (programData) => {
    const programCounts = programData.reduce((acc, student) => {
      // Ensure status is exactly matched and handle cases
      const status =
        student.Status === "Got into the University"
          ? "Found University"
          : "Did Not Find University";

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return programCounts;
  };

  // Get the counts of students in each status (Found University, Did Not Find University)
  const programCounts = countStudentsByProgram(filteredData3);

  // Prepare the chart data based on program counts
  const chartData3 = {
    labels: ["Found University", "Did Not Find University"], // Status labels
    datasets: [
      {
        data: [
          programCounts["Found University"] || 0, // Number of students who found a university
          programCounts["Did Not Find University"] || 0, // Number of students who did not find a university
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
      },
    ],
  };

  //chart 4

  const carrerChoice = [
    ...new Set(
      allStudentsData
        .map((student) => student.Career_Choice)
        .filter((choice) => choice !== "")
    ),
  ];

  const chartData4 = {
    labels: carrerChoice,
    datasets: [
      {
        data: [
          getDepartmentData(filter4).placementCount,
          getDepartmentData(filter4).higherStudiesCount,
          getDepartmentData(filter4).entrepreneurialCount,
        ],
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  // Chart 5
  // console.log();

  // Modify chart 5 data calculations to filter based on filter5
  const filteredByProgram = allStudentsData.filter(
    (student) => student.Program === filter5
  );

  // Function to calculate the count of students by career choice and year
  const countStudentsByYearAndChoice = (data, careerChoice, year) => {
    return data.filter(
      (student) =>
        student.Enrollment_Year === year &&
        student.Career_Choice === careerChoice
    ).length;
  };

  // Calculate unique years from the filtered data
  const years5 = [
    ...new Set(filteredByProgram.map((student) => student.Enrollment_Year)),
  ].sort();

  // Function to calculate total students for a specific year
  const countTotalStudentsByYear = (data, year) => {
    return data.filter((student) => student.Enrollment_Year === year).length;
  };

  // Create the data arrays in percentages for Placement and Higher Studies
  const placementDataByYear = years5.map((year) => {
    const totalStudents = countTotalStudentsByYear(filteredByProgram, year);
    const placementCount = countStudentsByYearAndChoice(
      filteredByProgram,
      "Job Placement",
      year
    );
    return totalStudents > 0
      ? ((placementCount / totalStudents) * 100).toFixed(2)
      : 0;
  });

  const higherStudiesDataByYear = years5.map((year) => {
    const totalStudents = countTotalStudentsByYear(filteredByProgram, year);
    const higherStudiesCount = countStudentsByYearAndChoice(
      filteredByProgram,
      "Higher Studies",
      year
    );
    return totalStudents > 0
      ? ((higherStudiesCount / totalStudents) * 100).toFixed(2)
      : 0;
  });

  // Chart Data with percentage values
  const chartData5 = {
    labels: years5, // The years for the X-axis
    datasets: [
      {
        label: "Placement (%)",
        data: placementDataByYear, // Data in percentages for placement students
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Higher Studies (%)",
        data: higherStudiesDataByYear, // Data in percentages for higher studies students
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Year",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
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
        text: "Students Opting for Placement vs Higher Studies",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
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
