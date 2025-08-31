import { useState } from "react";
import axios from "axios";
import SymbolsList from "./components/SymbolsList";

const App = () => {
  const [files, setFiles] = useState([]);
  const [commonSymbols, setCommonSymbols] = useState([]);
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => setFiles(e.target.files);

  const handleUpload = async () => {
    if (!files.length) return alert("Please select at least one CSV file!");

    setCommonSymbols([]); // reset old results
    setFileCount(files.length);

    const formData = new FormData();
    [...files].forEach((file) => formData.append("files", file));

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCommonSymbols(data.commonSymbols);
    } catch (err) {
      console.error(err);
      alert("Error processing files!");
    }
  };

  const handleDownload = () => {
    if (!commonSymbols.length) return alert("No symbols to download!");
    const csvContent = "data:text/csv;charset=utf-8," + commonSymbols.join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "common_symbols.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
          CSV Common Symbol Finder
        </h1>

        {/* File Input */}
        <input
          type="file"
          multiple
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm mb-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base"
          >
            Upload & Find Common
          </button>

          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition text-sm sm:text-base"
          >
            Download CSV
          </button>
        </div>

        {/* Summary Section */}
        {fileCount > 0 && (
          <div className="mt-4 text-center text-gray-700">
            <p className="font-medium">
              📂 {fileCount} file{fileCount > 1 ? "s" : ""} uploaded
            </p>
            <p className="font-medium">
              📊 {commonSymbols.length} common symbol{commonSymbols.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Results */}
        <SymbolsList symbols={commonSymbols} />
      </div>
    </div>
  );
};

export default App;
