// import React, { useState } from 'react';
// import axios from 'axios'; // Make sure to install axios: npm install axios

// const UploadButton = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       try {
//         const response = await axios.post('http://localhost:5000/api/file/import-csv', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert(response.data.message);
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         alert('An error occurred while uploading the file.');
//       } finally {
//         setIsUploading(false);
//       }
//     } else {
//       alert('Please select a file first!');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
//       <input
//         type="file"
//         className="mb-4"
//         onChange={handleFileChange}
//         accept=".csv"
//       />
//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//         disabled={isUploading}
//       >
//         {isUploading ? 'Uploading...' : 'Upload'}
//       </button>
//       {selectedFile && (
//         <p className="mt-2 text-sm text-gray-600">Selected file: {selectedFile.name}</p>
//       )}
//     </div>
//   );
// };

// export default UploadButton;
import React, { useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios: npm install axios


const UploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/api/file/import-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(response.data.message);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
      } finally {
        setIsUploading(false);
      }
    } else {
      alert('Please select a file first!');
    }
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Upload File</h2>
        <div className="space-y-4">
          <label 
            htmlFor="file-upload" 
            className="flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
          >
            <Upload className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Choose File</span>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept='.csv'
          />
          {selectedFile && (
            <div className="p-3 bg-blue-50 rounded-md flex items-center justify-between">
              <div className="flex items-center text-blue-800">
                <File className="w-5 h-5 mr-2" />
                <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;