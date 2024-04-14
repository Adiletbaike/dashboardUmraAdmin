import React from "react";

const DialogDelete = ({ message, onDialog }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-25">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <div className="flex justify-around">
          <button
            onClick={() => onDialog(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Ооба
          </button>
          <button
            onClick={() => onDialog(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md  focus:outline-none focus:ring focus:border-blue-300"
          >
            Жок
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogDelete;
