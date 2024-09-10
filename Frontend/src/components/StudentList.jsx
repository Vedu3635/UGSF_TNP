import React from "react";

const StudentList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Placement list</h3>
        {/* Content for Highest Packages */}
        <p>Details about the placement.</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Higher Studies (Student)</h3>
        {/* Content for Higher Studies */}
        <p>Details about students pursuing higher studies.</p>
      </div>
    </div>
  );
};

export default StudentList;
