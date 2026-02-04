import React from 'react';
import { CloseIcon } from './icons';

const BottomSheet = ({ isOpen, onClose, onEndChat, onMainMenu }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="bottom-sheet-overlay" onClick={onClose}></div>
      <div className="bottom-sheet">
        <div className="bottom-sheet-header">
          <h4>Shortcuts</h4>
          <button className="close-icon" onClick={onClose}>
            <CloseIcon size={20} color="#333" />
          </button>
        </div>
        <div className="bottom-sheet-option" onClick={onEndChat}>
          End Chat
        </div>
        <div className="bottom-sheet-option" onClick={onMainMenu}>
          Main Menu
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
