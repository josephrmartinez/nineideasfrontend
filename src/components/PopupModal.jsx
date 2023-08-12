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


// <p className="font-semibold text-md mb-1">Log in or sign up to:</p>
//         <ul className='text-sm mb-4 ml-4 list-disc'>
//           <li>Publish public lists</li>
//           <li>Comment on and like public lists</li>
//           <li>Securely save your lists</li>
//         </ul>
//         <p className='text-sm mb-4'>Or don't. You can use the site without creating an account. In this case, all of your lists are private and saved locally on your browser until you choose to clear browsing data.</p>
//         <p className='text-sm'>Make generating ideas a daily habit.</p>