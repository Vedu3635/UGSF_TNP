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
      (student) => student.career_choice === careerChoice
    ).length;
  };

  // Helper function to get data for each department
  const getDepartmentData = (department) => {
    const departmentStudents = allStudentsData.filter(
      (student) => student.program === department
    );
    const placementCount = departmentStudents.filter(
      (student) => student.career_choice === "Job Placement"
    ).length;
    const higherStudiesCount = departmentStudents.filter(
      (student) => student.career_choice === "Higher Studies"
    ).length;
    const entrepreneurialCount = departmentStudents.filter(
      (student) => student.career_choice === "Entrepreneurial Venture"
    ).length;

    return {
      placementCount,
      higherStudiesCount,
      entrepreneurialCount,
    };
  };

  const years1 = [
    ...new Set(
      placementData
        .map((student) => student.placement_year)
        .filter((year) => year && year !== "0000") // Remove null and "0000"
    ),
  ].sort();

  // Filter and prepare chart data based on the selected program
  const filteredData1 = placementData.filter(
    (student) => student.program === filter1
  );
  console.log("Filtered Data for", filter1, filteredData1);

  // Prepare chartData1
  const chartData1 = {
    labels: years1,
    datasets: [
      {
        label: filter1, // Dynamically change label based on selected program
        data: years1.map((year) => {
          const studentsInYearAndProgram = filteredData1.filter((student) => {
            return Number(student.placement_year) === Number(year);
          });

          // Debugging logs
          console.log(
            `Year: ${year}, Found Students:`,
            studentsInYearAndProgram.map((s) => ({
              id: s.enrollment_no,
              package: s.package,
            }))
          );

          if (studentsInYearAndProgram.length > 0) {
            const maxPackage = Math.max(
              ...studentsInYearAndProgram
                .map((student) => student.package)
                .filter((pkg) => pkg !== null && pkg !== undefined) // Ensure valid package values
            );

            console.log(
              `Max Package for ${filter1} in ${year}:`,
              maxPackage / 100000
            );
            return maxPackage / 100000;
          }

          return 0; // If no student data for that year and program, return 0
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Customize per program if needed
      },
    ],
  };

  console.log("Final Chart Data:", chartData1);

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
      (student) => student.program === filter2
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
    return student.program === filter3;
  });

  // Function to group students by their application status (Accepted, In Progress, Rejected)
  const countStudentsByProgram = (programData) => {
    const programCounts = programData.reduce((acc, student) => {
      // Categorizing status
      let higher_studies_status;
      if (student.higher_studies_status === "admitted") {
        higher_studies_status = "Admitted";
      } else if (student.higher_studies_status === "in process") {
        higher_studies_status = "In Progress";
      } else if (student.higher_studies_status === "rejected") {
        higher_studies_status = "Rejected";
      } else {
        higher_studies_status = "Unknown"; // Fallback in case of unexpected values
      }

      acc[higher_studies_status] = (acc[higher_studies_status] || 0) + 1;
      return acc;
    }, {});

    return programCounts;
  };

  // Get the counts of students in each status (Accepted, In Progress, Rejected)
  const programCounts = countStudentsByProgram(filteredData3);

  // Prepare the chart data based on program counts
  const chartData3 = {
    labels: ["Admitted", "In Progress", "Rejected"], // Updated labels
    datasets: [
      {
        data: [
          programCounts["Admitted"] || 0, // Number of students Admitted
          programCounts["In Progress"] || 0, // Number of students still in progress
          programCounts["Rejected"] || 0, // Number of students rejected
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Greenish for Accepted
          "rgba(255, 206, 86, 0.6)", // Yellow for In Progress
          "rgba(255, 99, 132, 0.6)", // Red for Rejected
        ],
      },
    ],
  };

  //chart 4
  const carrerChoice = [
    ...new Set(
      allStudentsData
        .map((student) => student.career_choice)
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

  // Modify chart 5 data calculations to filter based on filter5
  const filteredByProgram = allStudentsData.filter(
    (student) => student.program === filter5
  );

  // Function to calculate the count of students by career choice and year
  const countStudentsByYearAndChoice = (data, careerChoice, year) => {
    return data.filter(
      (student) =>
        student.enrollment_year === year &&
        student.career_choice === careerChoice
    ).length;
  };

  // Calculate unique years from the filtered data
  const years5 = [
    ...new Set(filteredByProgram.map((student) => student.enrollment_year)),
  ].sort();

  // Function to calculate total students for a specific year
  const countTotalStudentsByYear = (data, year) => {
    return data.filter((student) => student.enrollment_year === year).length;
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
      title: "Higher Studies",
      type: "pie",
      data: chartData3,
      options: pieChartOptions,
      filter: filter3,
      setFilter: setFilter3,
    },
    {
      title: "Student Carrer Choice",
      type: "pie",
      data: chartData4,
      options: pieChartOptions,
      filter: filter4,
      setFilter: setFilter4,
    },
    {
      title: "Placement vs Higher Studies Yearyl",
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
