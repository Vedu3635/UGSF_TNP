import React from "react";
import UploadButton from "./UploadButton";

const LeftSlider = () => {
  return (
    <div className="w-full md:w-64 bg-blue-700 p-4 text-white">
      <h3 className="text-xl font-bold mb-4">Left Sidebar</h3>
      {/* Add your sidebar content here */}
      <UploadButton/>
    </div>
  );
};

export default LeftSlider;
