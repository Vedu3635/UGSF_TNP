import React, { useState, useEffect, useMemo } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Slider from "react-slick";
import "chart.js/auto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Charts = ({ allStudentsData, placementData, higherStudiesData }) => {
  const [students, setStudents] = useState({
    DCE: [],
    DIT: [],
    DCS: [],
  });

  // console.log(allStudentsData);
  // console.log(placementData);
  // console.log(higherStudiesData);
  // console.log(typeof studentsData);

  const [filter1, setFilter1] = useState("DCE");
  const [filter2, setFilter2] = useState("DCE");
  const [filter3, setFilter3] = useState("DCE");
  const [filter4, setFilter4] = useState("DCE");
  const [filter5, setFilter5] = useState("DCE");

  useEffect(() => {
    // Categorize students into departments based on the passed prop data
    const categorizedStudents = allStudentsData.reduce(
      (acc, student) => {
        if (student.program === "DCE") {
          acc.DCE.push(student);
        } else if (student.program === "DIT") {
          acc.DIT.push(student);
        } else if (student.program === "DCS") {
          acc.DCS.push(student);
        }
        return acc;
      },
      { DCE: [], DIT: [], DCS: [] }
    );

    setStudents(categorizedStudents);
  }, [allStudentsData]);

  // Helper function to get student counts by career choice
  // const getStudentCountsByCareerChoice = (careerChoice) => {
  //   return allStudentsData.filter(
  //     (student) => student.career_choice === careerChoice
  //   ).length;
  // };

  // Helper function to get data for each department
  // const getDepartmentData = (department) => {
  //   const departmentStudents = allStudentsData.filter(
  //     (student) => student.program === department
  //   );
  //   const placementCount = departmentStudents.filter(
  //     (student) => student.career_choice === "Job Placement"
  //   ).length;
  //   const higherStudiesCount = departmentStudents.filter(
  //     (student) => student.career_choice === "Higher Studies"
  //   ).length;
  //   const entrepreneurialCount = departmentStudents.filter(
  //     (student) => student.career_choice === "Entrepreneurial Venture"
  //   ).length;

  //   return {
  //     placementCount,
  //     higherStudiesCount,
  //     entrepreneurialCount,
  //   };
  // };

  // chart 1

  const years1 = [
    ...new Set(
      placementData
        .map((student) => student.batch)
        .filter((year) => year && year !== "0000") // Remove null and "0000"
    ),
  ].sort();

  // Filter and prepare chart data based on the selected program
  const filteredData1 = placementData.filter(
    (student) => student.program === filter1
  );

  // Prepare chartData1
  const chartData1 = {
    labels: years1,
    datasets: [
      {
        label: filter1, // Dynamically change label based on selected program
        data: years1.map((year) => {
          const studentsInYearAndProgram = filteredData1.filter((student) => {
            return Number(student.batch) === Number(year);
          });

          if (studentsInYearAndProgram.length > 0) {
            const maxPackage = Math.max(
              ...studentsInYearAndProgram
                .map((student) => student.package)
                .filter((pkg) => pkg !== null && pkg !== undefined) // Ensure valid package values
            );

            return maxPackage / 100000;
          }

          return 0; // If no student data for that year and program, return 0
        }),
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Customize per program if needed
      },
    ],
  };

  //chart 2

  const countPositions = (data) => {
    const positionCounts = data.reduce((acc, { position }) => {
      // Only count if position is not null or undefined
      if (position != null) {
        // This checks for both null and undefined
        acc[position] = (acc[position] || 0) + 1;
      }
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
  // Function to filter data for the latest 4-5 years
  const latestYears = 5;
  const currentYear = new Date().getFullYear(); // 2025
  const startYear = currentYear - latestYears - 1; // 2019

  const filteredDataByYear = placementData.filter((student) => {
    const batch = Number(student.batch); // Handle string batches
    const inRange = batch >= startYear && batch <= currentYear;
    return inRange;
  });

  // Function to calculate the average package by batch in LPA
  const calculateAveragePackageByYear = (yearData) => {
    const yearGroups = yearData.reduce((acc, student) => {
      const year = Number(student.batch);
      if (!acc[year]) {
        acc[year] = { totalPackage: 0, count: 0 };
      }
      acc[year].totalPackage += (student.package || 0) / 100000;
      acc[year].count += 1;
      return acc;
    }, {});

    const averagesByYear = {};
    for (const year in yearGroups) {
      averagesByYear[year] =
        yearGroups[year].totalPackage / yearGroups[year].count;
    }
    return averagesByYear;
  };

  const averagePackages = calculateAveragePackageByYear(filteredDataByYear);

  // Prepare the chart data for average package by year
  const chartData3 = {
    labels: Array.from({ length: latestYears }, (_, i) => startYear + i), // [2021, 2022, 2023, 2024, 2025]
    datasets: [
      {
        label: "Average Package (LPA)",
        data: Array.from({ length: latestYears }, (_, i) => {
          const year = startYear + i;
          return averagePackages[year] || 0; // Include 0 for missing years
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  //chart 4

  // Filter data for the last 5 years
  // Define the time range
  const latestYears4 = 5;
  const currentYear4 = new Date().getFullYear(); // 2025
  const startYear4 = currentYear4 - latestYears4 - 1; // 2021

  const calculatePlacementPercentageByYear = (data) => {
    if (!data || data.length === 0) {
      console.log("No data provided to calculatePlacementPercentageByYear");
      return {};
    }

    // Step 1: Aggregate totals and counts per year
    const yearStats = data.reduce((acc, student) => {
      const year = student.batch
        ? Number(String(student.batch).match(/\d{4}/)?.[0])
        : null;
      if (year && year >= startYear4 && year <= currentYear4) {
        if (!acc[year]) {
          acc[year] = { placed: 0, notPlaced: 0, total: 0 };
        }
        acc[year].total += 1; // Count every student
        if (
          student.placement_status === "Placed" ||
          student.placement_status === "placed"
        ) {
          acc[year].placed += 1;
        } else {
          acc[year].notPlaced += 1;
        }
      }
      return acc;
    }, {});

    // Step 2: Calculate percentages
    const yearPercentages = {};
    for (const year in yearStats) {
      const { placed, notPlaced, total } = yearStats[year];
      yearPercentages[year] = {
        placedPercentage: (placed / total) * 100,
        notPlacedPercentage: (notPlaced / total) * 100,
      };
    }

    return yearPercentages;
  };

  // Apply filter if needed (e.g., filter by program)
  const filteredPlacementData4 = filter4
    ? placementData.filter((student) => student.program === filter4)
    : placementData;
  const placementPercentages = calculatePlacementPercentageByYear(
    filteredPlacementData4
  );

  // Step 3: Prepare chart data for a stacked percentage bar chart
  const chartData4 = {
    labels: Array.from({ length: latestYears4 }, (_, i) => startYear4 + i), // [2021, 2022, 2023, 2024, 2025]
    datasets: [
      {
        label: "Placed (%)",
        data: Array.from({ length: latestYears4 }, (_, i) => {
          const year = startYear4 + i;
          return placementPercentages[year]?.placedPercentage || 0;
        }),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal for placed
      },
      {
        label: "Not Placed (%)",
        data: Array.from({ length: latestYears }, (_, i) => {
          const year = startYear4 + i;
          return placementPercentages[year]?.notPlacedPercentage || 0;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red for not placed
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
        student.batch === year && student.career_choice === careerChoice
    ).length;
  };

  // Calculate unique years from the filtered data
  const years5 = [
    ...new Set(filteredByProgram.map((student) => student.batch)),
  ].sort();

  // Function to calculate total students for a specific year
  const countTotalStudentsByYear = (data, year) => {
    return data.filter((student) => student.batch === year).length;
  };

  // Create the data arrays in percentages for Placement, Higher Studies, and Entrepreneurship
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

  // New: Entrepreneurship/Business percentage calculation
  const entrepreneurshipDataByYear = years5.map((year) => {
    const totalStudents = countTotalStudentsByYear(filteredByProgram, year);
    const entrepreneurshipCount = countStudentsByYearAndChoice(
      filteredByProgram,
      "Entrepreneurship", // Adjust this value based on your data (e.g., "Business")
      year
    );
    return totalStudents > 0
      ? ((entrepreneurshipCount / totalStudents) * 100).toFixed(2)
      : 0;
  });

  // Chart Data with percentage values, including Entrepreneurship
  const chartData5 = {
    labels: years5, // The years for the X-axis
    datasets: [
      {
        label: "Placement (%)",
        data: placementDataByYear, // Data in percentages for placement students
        borderColor: "rgba(75, 192, 192, 1)", // Teal
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Higher Studies (%)",
        data: higherStudiesDataByYear, // Data in percentages for higher studies students
        borderColor: "rgba(255, 99, 132, 1)", // Red
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Entrepreneurship (%)", // New dataset
        data: entrepreneurshipDataByYear, // Data in percentages for entrepreneurship students
        borderColor: "rgba(153, 102, 255, 1)", // Purple (adjust as needed)
        backgroundColor: "rgba(153, 102, 255, 0.2)",
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
      title: "Average Package by Year", // Updated title to reflect the new chart purpose
      type: "bar", // Change from "pie" to "bar" (or "line" if preferred)
      data: chartData3, // The new chartData3 with years and average packages
      options: barChartOptions, // Replace pieChartOptions with options suited for bar/line chart
      filter: filter3, // Optional: only if you add a program filter back
      setFilter: setFilter3, // Optional: only if filter is still relevant
    },
    {
      title: "Placement Percentage by Year (Last 5 Years)", // Updated title to reflect the new purpose
      type: "bar", // Change from "pie" to "bar" for a stacked bar chart
      data: chartData4, // Use chartData8 (from the previous response) instead of chartData4
      options: barChartOptions,
      filter: filter4, // Keep if you're using a filter; otherwise, remove
      setFilter: setFilter4, // Keep if you're using a filter; otherwise, remove
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
    const departments = ["DCE", "DCS", "DIT"];
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
