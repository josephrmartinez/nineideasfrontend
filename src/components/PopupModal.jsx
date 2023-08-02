import React, { useState, useEffect } from 'react';

const PopupModal = ({ isOpen, onClose, children }) => {
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalVisible(false);
    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (modalVisible && event.keyCode === 27) {
        closeModal();
      }
    };

    const handleClickOutside = (event) => {
      if (modalVisible && !event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [modalVisible]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 ${modalVisible ? '' : 'hidden'}`}>
      <div className="modal-content bg-white rounded-lg p-4">
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
