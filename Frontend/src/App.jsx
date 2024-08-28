import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const chartData1 = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'LPA',
      data: [4, 6, 8, 9, 10],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  const chartData2 = {
    labels: ['Machine Learning', 'Full Stack Developer', 'Data Scientist', 'Cloud Computing', 'DevOps', 'Data Analyst', 'Cybersecurity', 'Mobile App Development', 'Software Testing'],
    datasets: [{
      label: 'LPA',
      data: [17.5, 15, 12, 14, 13, 10, 11, 9, 8],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-1/6 bg-gray-200 p-4">
        <h3 className="text-xl font-bold mb-4">Left Sidebar</h3>
        {/* Add your sidebar content here */}
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-around bg-white p-4 rounded shadow">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500">Students</h2>
            <p className="text-3xl font-bold">1000</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500">Higher Studies</h2>
            <p className="text-3xl font-bold">1000</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-500">Companies</h2>
            <p className="text-3xl font-bold">150</p>
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
            <p className="text-sm">Full Stack Developer</p>
            <div className="flex justify-between mt-2">
              <span>2 Positions</span>
              <span>Full Time</span>
              <span className="font-bold text-red-500">10 LPA</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">Tatva Soft Company</h3>
            <p className="text-sm">Full Stack Developer</p>
            <div className="flex justify-between mt-2">
              <span>2 Positions</span>
              <span>Full Time</span>
              <span className="font-bold text-red-500">10 LPA</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
            <p className="text-sm">Machine Learning</p>
            <div className="flex justify-between mt-2">
              <span>2 Positions</span>
              <span>Full Time</span>
              <span className="font-bold text-red-500">10 LPA</span>
            </div>
          </div>
        </div>

        {/* Charts */}
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

        {/* Additional Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Highest Packages</h3>
            {/* Content for Highest Packages */}
            <p>Details about the highest packages offered.</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Higher Studies (Student)</h3>
            {/* Content for Higher Studies */}
            <p>Details about students pursuing higher studies.</p>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/6 bg-gray-200 p-4">
        <h3 className="text-xl font-bold mb-4">Recent Companies</h3>
        {/* Add your recent companies content here */}
      </div>
    </div>
  );
}

export default App;
