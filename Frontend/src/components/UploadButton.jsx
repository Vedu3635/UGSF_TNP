// src/components/UploadButton.js
import React, { useState } from 'react';

const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      // Here you would handle file upload, like sending it to a server
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
      <input
        type="file"
        className="mb-4"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload
      </button>
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600">Selected file: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default UploadButton;
