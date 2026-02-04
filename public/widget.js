(function () {
  // === Floating Button ===
  const chatButton = document.createElement("div");
  chatButton.innerHTML = `<img src="https://troudz-chatbot.netlify.app/favicon.ico" alt="Chat" style="width: 20px; height: 20px;" />`;





  Object.assign(chatButton.style, {
    position: "fixed",
    bottom: "60px",
    right: "10px",
    width: "40px",
    height: "40px",
    background: "#fff",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundImage: "url('/about02.png')",
    // backgroundSize: "contain",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    cursor: "pointer",
    zIndex: "9999",
    fontSize: "24px",
  });
  document.body.appendChild(chatButton);

  // === Iframe Container ===
  const chatContainer = document.createElement("div");
  Object.assign(chatContainer.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "90vw",      // responsive width
    maxWidth: "400px",  // max width for large screens
    height: "80vh",     // responsive height
    maxHeight: "600px", // max height for large screens
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "none",
  });

const iframe = document.createElement("iframe");
iframe.src = "https://troudz-chatbot.netlify.app/";
Object.assign(iframe.style, {
  width: "100%",
  height: "100%",
  border: "none",
  display: "block", // prevents inline gap
});
chatContainer.appendChild(iframe);

  document.body.appendChild(chatContainer);

  // === Toggle Chat Window (without API call) ===
  chatButton.addEventListener("click", () => {
    const isHidden = chatContainer.style.display === "none";
    chatContainer.style.display = isHidden ? "block" : "none";
  });

  
  // Optional: adjust size on window resize
  window.addEventListener("resize", () => {
    const width = Math.min(window.innerWidth * 0.9, 400);
    const height = Math.min(window.innerHeight * 0.8, 600);
    chatContainer.style.width = width + "px";
    chatContainer.style.height = height + "px";
  });
})();