
(function () {
  // === Floating Button ===
  const chatButton = document.createElement("div");
 chatButton.innerHTML = `<img src="/about02.png" alt="Chat" style="width: 24px; height: 24px;" />`;



  Object.assign(chatButton.style, {
    position: "fixed",
    bottom: "60px",
    right: "10px",
    width: "40px",
    height: "40px",
    background: "#000",
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
    width: "400px",
    height: "600px",
    border: "none",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "none", // initially hidden
  });

const iframe = document.createElement("iframe");
iframe.src = "https://chatassistent5.netlify.app";
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
})();
