import React from "react";

const DialogDelete = ({ message, onDialog }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-25">
      <div className="bg-white py-6 px-10 rounded-lg shadow-md">
        <h3 className="flex text-lg font-semibold mb-4 justify-center">{message}</h3>
        <div className="flex justify-around gap-3">
          <button
            onClick={() => onDialog(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            Да
          </button>
          <button
            onClick={() => onDialog(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md  focus:outline-none focus:ring focus:border-blue-300"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogDelete;
