import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const ModalCalendar = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper2") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 overflow-y-scroll backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
      id="wrapper2"
    >
      <div className="w-[90%] h-full mx-auto flex flex-col">
      <button
          className="absolute text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          <IoCloseCircleSharp className="text-gray-500 text-2xl m-4"/>
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default ModalCalendar;
