import React from "react";

import Header from "./components/Header";
import CompanySlider from "./components/CompanySlider";
import NumberBox from "./components/NumberBox";
import Charts from "./components/Charts";
import StudentList from "./components/StudentList";
import LeftSlider from "./components/LeftSlider";
import RightSlider from "./components/RightSlider";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Left Sidebar */}
      <LeftSlider />
      {/* Navbar */}
      <Header />
      <div className="flex-1 container mx-auto p-4 bg-[#bed5e7]">
        {/* NumberBox */}
        <NumberBox />
        {/* company slider */}
        <CompanySlider />
        {/* Charts */}
        <Charts />
        {/* Additional Containers */}
        <StudentList />
      </div>

      {/* Right Sidebar */}
      <RightSlider />
    </div>
  );
}

export default App;
