import React from 'react';

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-4 w-72 z-10">
        <p className="text-center">Log in or sign up to:
Publish public lists
Comment on and like public lists
Securely save your lists

You can use the site without creating an account. In this case, all of your lists are private and saved locally on your browser until you choose to clear browsing data.

Generate new ideas every day.</p>
      </div>
    </div>
  );
};

export default PopupModal;
