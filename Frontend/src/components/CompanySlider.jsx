import React from "react";

const CompanySlider = () => {
  return (
    <div className="flex overflow-x-scroll space-x-4 my-4 snap-x pb-2">
      <div className="bg-white p-4 shadow min-w-[487px] snap-center rounded-3xl">
        <div className="flex-col">
          <img src="image_4.png" />
          <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
        </div>

        <p className="text-sm">Full Stack Developer</p>
        <div className="flex justify-between mt-2">
          <span className="text-[#030082] font-semibold ">2 Positions</span>
          <span className="text-[#030082] font-semibold">Full Time</span>
          <span className="font-bold text-red-500">10 LPA</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow min-w-[487px] snap-center">
        <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
        <p className="text-sm">Full Stack Developer</p>
        <div className="flex justify-between mt-2">
          <span className="text-[#030082] font-semibold ">2 Positions</span>
          <span className="text-[#030082] font-semibold ">Full Time</span>
          <span className="font-bold text-red-500">10 LPA</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow min-w-[487px] snap-center">
        <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
        <p className="text-sm">Full Stack Developer</p>
        <div className="flex justify-between mt-2">
          <span className="text-blue-900">2 Positions</span>
          <span className="text-[#030082] font-semibold ">Full Time</span>
          <span className="font-bold text-red-500">10 LPA</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow min-w-[487px] snap-center">
        <h3 className="text-xl font-bold">Tatva Soft Company</h3>
        <p className="text-sm">Full Stack Developer</p>
        <div className="flex justify-between mt-2">
          <span className="text-[#030082] font-semibold ">2 Positions</span>
          <span className="text-[#030082] font-semibold ">Full Time</span>
          <span className="font-bold text-red-500">10 LPA</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow min-w-[487px] snap-center">
        <h3 className="text-xl font-bold">Tata Consultancy Service</h3>
        <p className="text-sm">Machine Learning</p>
        <div className="flex justify-between mt-2">
          <span className="text-[#030082] font-semibold ">2 Positions</span>
          <span className="text-[#030082] font-semibold ">Full Time</span>
          <span className="font-bold text-red-500">10 LPA</span>
        </div>
      </div>
    </div>
  );
};

export default CompanySlider;
