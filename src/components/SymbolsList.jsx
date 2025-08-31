const SymbolsList = ({ symbols }) => {
  if (symbols.length === 0) {
    return (
      <div className="mt-6 text-center text-red-600 font-semibold">
        ❌ No common symbols found from the uploaded files.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
        ✅ Common Symbols
      </h2>
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {symbols.map((sym, idx) => (
            <li
              key={idx}
              className="bg-white px-3 py-1 rounded shadow text-gray-700 text-sm sm:text-base"
            >
              {sym}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SymbolsList;
