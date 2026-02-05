// import React from 'react';
// import { RefreshIcon } from './icons';
// import logo from "../../assets/favicon.ico";

// const ChatHeader = ({ onRefresh }) => {
//   return (
//     <div className="chat-header">
//       <div className="chat-logo">
//        <img src={logo} alt="logo" className="chat-logo" />
//       </div>
//       <div className="chat-header-text">
//         <h3>Troudz Virtual Assistant</h3>
//         <span className="online-status">● Online</span>
//       </div>
//       <button className="refresh-btn" onClick={onRefresh}>
//         <RefreshIcon size={22} color="white" />
//       </button>
//     </div>
//   );
// };

// export default ChatHeader;



import React from 'react';
import { RefreshIcon } from './icons';
import logo from "../../assets/favicon.ico";
import { CloseIcon , MaximizeIcon, MinimizeIcon  } from './icons';


const ChatHeader = ({ onRefresh, onClose, onToggleMaximize, isMaximized }) => {
  return (
    <div className="chat-header">
      <div className="chat-logo">
        <img src={logo} alt="logo" className="chat-logo" />
      </div>
      <div className="chat-header-text">
        <h3>Troudz Virtual Assistant</h3>
        <span className="online-status">● Online</span>
      </div>
      <div className="chat-header-actions">
        <button className="header-btn refresh-btn" onClick={onRefresh} title="Refresh">
          <RefreshIcon size={20} color="white" />
        </button>
        <button className="header-btn maximize-btn" onClick={onToggleMaximize} title={isMaximized ? "Minimize" : "Maximize"}>
          {isMaximized ? <MinimizeIcon size={20} color="white" /> : <MaximizeIcon size={20} color="white" />}
        </button>
        <button className="header-btn close-btn" onClick={onClose} title="Close">
          <CloseIcon size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;