import React from 'react';

const PopupModal = ({ popupMessage, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-10" onClick={onClose}></div>
      <div className="bg-white rounded shadow-lg p-8 w-80 z-10 text-left">
        {popupMessage}
      </div>
    </div>
  );
};

export default PopupModal;