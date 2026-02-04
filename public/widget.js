// (function () { 
//   // === Floating Button ===
//   const chatButton = document.createElement("div");
//   chatButton.innerHTML = `<img src="https://troudz-chatbot.netlify.app/favicon.ico" alt="Chat" style="width: 20px; height: 20px;" />`;

//   Object.assign(chatButton.style, {
//     position: "fixed",
//     bottom: "60px",
//     right: "10px",
//     width: "40px",
//     height: "40px",
//     background: "#fff",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     zIndex: "9999",
//     fontSize: "24px",
//     border: "2px solid #00dde8",
//     boxShadow: "0 0 0 0 rgba(0, 109, 252, 0.88)", // start shadow (blue ring)
//     animation: "pulseBorder 2s infinite", // animation applied
//   });
//   document.body.appendChild(chatButton);

//   // === Add CSS Animation ===
//   const style = document.createElement("style");
//   style.innerHTML = `
//     @keyframes pulseBorder {
//       0% {
//         box-shadow: 0 0 0 0 rgba(0, 108, 252, 0.8), 0 0 10px rgba(0, 221, 232, 0.7);
//       }
//       50% {
//         box-shadow: 0 0 0 12px rgba(0, 108, 252, 0), 0 0 20px rgba(0, 221, 232, 0.5);
//       }
//       100% {
//         box-shadow: 0 0 0 0 rgba(0, 108, 252, 0), 0 0 10px rgba(0, 221, 232, 0);
//       }
//     }
//   `;
//   document.head.appendChild(style);

//   // === Iframe Container ===
//   const chatContainer = document.createElement("div");
//   Object.assign(chatContainer.style, {
//     position: "fixed",
//     bottom: "90px",
//     right: "20px",
//     width: "90vw",
//     maxWidth: "400px",
//     height: "80vh",
//     maxHeight: "600px",
//     borderRadius: "10px",
//     overflow: "hidden",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//     zIndex: "9999",
//     display: "none",
//   });

//   const iframe = document.createElement("iframe");
//   iframe.src = "https://troudz-chatbot.netlify.app/";
//   Object.assign(iframe.style, {
//     width: "100%",
//     height: "100%",
//     border: "none",
//     display: "block",
//   });
//   chatContainer.appendChild(iframe);

//   document.body.appendChild(chatContainer);

//   // === Toggle Chat Window ===
//   chatButton.addEventListener("click", () => {
//     const isHidden = chatContainer.style.display === "none";
//     chatContainer.style.display = isHidden ? "block" : "none";
//   });

//   // === Responsive Resize ===
//   window.addEventListener("resize", () => {
//     const width = Math.min(window.innerWidth * 0.9, 400);
//     const height = Math.min(window.innerHeight * 0.8, 600);
//     chatContainer.style.width = width + "px";
//     chatContainer.style.height = height + "px";
//   });
// })();



(function () { 
  // === Floating Button ===
  const chatButton = document.createElement("div");
  chatButton.innerHTML = `<img src="https://troudz-chatbot.netlify.app/favicon.ico" alt="Chat" style="width: 30px; height: 30px;" />`;
  Object.assign(chatButton.style, {
    position: "fixed",
    bottom: "60px",
    right: "10px",
    width: "60px",
    height: "60px",
    background: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: "9999",
    fontSize: "24px",
    border: "2px solid #00dde8",
    boxShadow: "0 0 0 0 rgba(0, 109, 252, 0.88)",
    animation: "pulseBorder 2s infinite",
  });
  document.body.appendChild(chatButton);

  // === Message Bubble ===
  const messageBubble = document.createElement("div");
  messageBubble.innerHTML = `
    <div style="background: #fff; padding: 10px 15px; border-radius: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      Hi! How can I assist you?
    </div>
  `;
  Object.assign(messageBubble.style, {
    position: "fixed",
    bottom: "110px",
    right: "10px",
    zIndex: "9999",
    opacity: "0",
    transform: "translateY(10px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  });
  document.body.appendChild(messageBubble);

  // === Toggle Message Visibility ===
  let isVisible = false;
  
  function toggleMessage() {
    isVisible = !isVisible;
    if (isVisible) {
      messageBubble.style.opacity = "1";
      messageBubble.style.transform = "translateY(0)";
    } else {
      messageBubble.style.opacity = "0";
      messageBubble.style.transform = "translateY(10px)";
    }
  }

  setTimeout(() => {
    toggleMessage();
    setInterval(toggleMessage, 10000);
  }, 3000);

  // === Add CSS Animation ===
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulseBorder {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 108, 252, 0.8), 0 0 10px rgba(0, 221, 232, 0.7);
      }
      50% {
        box-shadow: 0 0 0 12px rgba(0, 108, 252, 0), 0 0 20px rgba(0, 221, 232, 0.5);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 108, 252, 0), 0 0 10px rgba(0, 221, 232, 0);
      }
    }
    
    /* Smooth transitions for maximize/minimize */
    .chat-widget-container {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    @keyframes expandWidget {
      from {
        transform: scale(0.95);
        opacity: 0.95;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes shrinkWidget {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(0.95);
        opacity: 0.95;
      }
    }
    
    .chat-widget-container.expanding {
      animation: expandWidget 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .chat-widget-container.shrinking {
      animation: shrinkWidget 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;
  document.head.appendChild(style);

  // === Iframe Container ===
  const chatContainer = document.createElement("div");
  chatContainer.className = "chat-widget-container";
  Object.assign(chatContainer.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "90vw",
    maxWidth: "400px",
    height: "80vh",
    maxHeight: "600px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "none",
    transition: "all 0.3s ease-in-out",
  });

  const iframe = document.createElement("iframe");
  iframe.src = "https://troudz-chatbot.netlify.app/";
  Object.assign(iframe.style, {
    width: "100%",
    height: "100%",
    border: "none",
    display: "block",
  });
  chatContainer.appendChild(iframe);
  document.body.appendChild(chatContainer);

  let isMaximized = false;
  let isChatOpen = false;

  // === Toggle Chat Window ===
  chatButton.addEventListener("click", () => {
    isChatOpen = !isChatOpen;
    chatContainer.style.display = isChatOpen ? "block" : "none";
    
    // Hide message bubble when chat is opened
    if (isChatOpen) {
      messageBubble.style.opacity = "0";
      messageBubble.style.transform = "translateY(10px)";
    }
  });

  // === Listen for messages from iframe ===
  window.addEventListener("message", (event) => {
    // Verify origin for security (update with your actual domain)
    // if (event.origin !== "https://troudz-chatbot.netlify.app") return;

    if (event.data.type === "CLOSE_CHATBOT") {
      // Close the chatbot
      chatContainer.style.display = "none";
      isChatOpen = false;
      
      // Reset to normal size if maximized
      if (isMaximized) {
        isMaximized = false;
        setNormalSize();
      }
    }

    if (event.data.type === "TOGGLE_MAXIMIZE") {
      isMaximized = event.data.isMaximized;
      
      if (isMaximized) {
        setMaximizedSize();
      } else {
        setNormalSize();
      }
    }
  });

  // === Maximize Functions ===
  function setMaximizedSize() {
    // Add expanding animation class
    chatContainer.classList.add('expanding');
    
    Object.assign(chatContainer.style, {
      width: "100vw",
      height: "100vh",
      maxWidth: "100vw",
      maxHeight: "100vh",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      borderRadius: "0",
    });
    
    // Remove animation class after animation completes
    setTimeout(() => {
      chatContainer.classList.remove('expanding');
    }, 400);
  }

  function setNormalSize() {
    // Add shrinking animation class
    chatContainer.classList.add('shrinking');
    
    const width = Math.min(window.innerWidth * 0.9, 400);
    const height = Math.min(window.innerHeight * 0.8, 600);
    
    Object.assign(chatContainer.style, {
      width: width + "px",
      height: height + "px",
      maxWidth: "400px",
      maxHeight: "600px",
      top: "auto",
      left: "auto",
      right: "20px",
      bottom: "90px",
      borderRadius: "10px",
    });
    
    // Remove animation class after animation completes
    setTimeout(() => {
      chatContainer.classList.remove('shrinking');
    }, 400);
  }

  // === Responsive Resize ===
  window.addEventListener("resize", () => {
    if (!isMaximized) {
      setNormalSize();
    }
  });
})();