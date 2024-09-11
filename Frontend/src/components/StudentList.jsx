import React from "react";

const StudentList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      {[
        { title: "Placement list", content: "Details about the placement." },
        { title: "Higher Studies (Student)", content: "Details about students pursuing higher studies." },
      ].map((item, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-4">{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;