import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductIcon, ServiceIcon, QuestionIcon, ContactIcon, HomeIcon } from "./icons";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import BottomSheet from "./BottomSheet";
import UserInfoForm from "./UserInfoForm";
import "./ChatPage1.css";

// const API_BASE = "/api";

const MENU_CONFIG = {
  main: {
    text: "Please choose an option:",
    options: [
      {
        label: "Products Information",
        icon: ProductIcon,
        subMenu: {
          text: "Which product would you like info about?",
          options: [
            {
              label: "Trocare",
              answer:
                "Trocare is an AI-powered support engine that delivers instant, context-aware answers using advanced language models and a proprietary indexing layer. It searches across internal documents, CRMs, and databases to provide accurate, real-time information 24/7. Designed for customers, employees, and partners, Trocare enhances onboarding, troubleshooting, and support with tailored intelligence, ensuring the right answers reach the right people instantly.",
              url: "https://troudz.com/trocare",
            },
            {
              label: "Trosell",
              answer:
                "Trosell is an AI-powered WhatsApp sales assistant that automates vendor interactions from orders to payments. It personalizes offers, manages updates, follows up on bills, and keeps vendors engaged 24/7. Seamlessly integrating with databases and ERP systems, Trosell ensures real-time syncing, reduces manual effort, strengthens vendor relationships, and accelerates revenue through automated, intelligent, and hassle-free communication—all within WhatsApp.",
              url: "https://troudz.com/trosell",
            },
          ],
        },
      },
      {
        label: "Services Queries",
        icon: ServiceIcon,
        subMenu: {
          text: "Which service would you like info about?",
          options: [
            {
              label: "Creative Intelligence",
              answer:
                "Troudz embeds Generative AI into business workflows through Creative Intelligence, building domain-specific RAG-based chatbots, content generators, and document assistants integrated with existing systems. Using fine-tuned models on internal data, we ensure accuracy, privacy, and impact. With scalable, secure architecture, Troudz enables intelligent automation for customer support and operations, driving smarter decisions, higher productivity, and future-ready business growth.",
              url: "https://troudz.com/creative-intelligence",
            },
            {
              label: "Smart Workflows",
              answer:
                "Troudz Smart Workflows replace repetitive manual tasks with agentic AI systems that act, decide, and adapt autonomously. From data entry to onboarding, these intelligent agents handle complex workflows across HR, finance, and operations—faster and error-free. By interacting with APIs, databases, and tools like humans, they deliver tailored, scalable automation that boosts efficiency, precision, and frees teams for higher-value work.",
              url: "https://troudz.com/smart-workflows",
            },
            {
              label: "Data Foundations",
              answer:
                "Troudz empowers businesses with next-gen data engineering solutions that modernize platforms, enable secure migrations, and build scalable, cloud-native infrastructures on GCP and Azure. From data pipelines to MLOps, we create analytics-ready architectures that drive real-time decisions, reduce manual effort, and fuel innovation. Whether modernizing legacy systems or starting fresh, we unify, protect, and unlock data for smarter, faster, competitive growth.",
              url: "https://troudz.com/data-foundations",
            },
            {
              label: "Visual Insights",
              answer:
                "Troudz empowers smarter decisions by transforming raw data into interactive, role-specific dashboards with Visual Insights. We modernize BI landscapes, enable self-service analytics, and bridge data with action across sales, finance, HR, support, and product teams. Using tools like Looker, Power BI, and Power Apps, we deliver scalable, predictive, and visually rich experiences that simplify complexity, track KPIs, forecast trends, and drive confident growth.",
              url: "https://troudz.com/visual-insights",
            },
          ],
        },
      },
      // {
      //   label: "Other Queries",
      //   icon: QuestionIcon,
      //   freeInput: true,
      // },
      {
        label: "Contact us",
        icon: ContactIcon,
        answer: `📍 Bangalore, India
               📧 support@troudz.com
               📞 +91 7019780591`,
        url: "https://troudz.com/contact",
      },
    ],
  },
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stage, setStage] = useState("userInfo");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const streamingIntervalRef = useRef(null);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const streamText = (fullText, onComplete) => {
    const messageId = uuidv4();
    let currentIndex = 0;

    setStreamingMessage({
      id: messageId,
      sender: "bot",
      text: "",
      time: getCurrentTime(),
    });

    streamingIntervalRef.current = setInterval(() => {
      if (currentIndex < fullText.length) {
        const charsToAdd = Math.min(2, fullText.length - currentIndex);
        currentIndex += charsToAdd;

        setStreamingMessage((prev) => ({
          ...prev,
          text: fullText.substring(0, currentIndex),
        }));
      } else {
        clearInterval(streamingIntervalRef.current);
        const finalMessage = {
          id: messageId,
          sender: "bot",
          text: fullText,
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, finalMessage]);
        setStreamingMessage(null);
        if (onComplete) onComplete();
      }
    }, 20);
  };

  const botReply = (response, useStreaming = false) => {
    if (useStreaming && typeof response.text === "string") {
      streamText(response.text, response.onComplete);
    } else {
      setTimeout(() => {
        setMessages((prev) => [...prev, { ...response, id: response.id || uuidv4() }]);
      }, 700);
    }
  };

  const addBotMenu = (menu) => {
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: menu.text,
      options: menu.options,
      time: getCurrentTime(),
    });
  };

  // const handleUserInfoComplete = async (userData) => {
  //   setUserName(userData.name);
  //   setUserPhone(userData.phone);

  //   try {
  //     const res = await fetch(`${API_BASE}/users`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: userData.name,
  //         phone_number: userData.phone,
  //         email: userData.email,
  //         additional_info: "",
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to create user");
  //     }

  //     const data = await res.json();
  //     setUserId(data.UserID);

  //     const res2 = await fetch(`${API_BASE}/conversations/start`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ user_id: data.UserID }),
  //     });
  //     const conv = await res2.json();
  //     setSessionId(conv.session_id);

  //     setStage("mainMenu");
  //     setShowInput(false);

  //     setMessages([
  //       {
  //         id: uuidv4(),
  //         sender: "bot",
  //         text: `👋 Welcome ${userData.name}! I'm your Troudz Virtual Assistant.`,
  //         time: getCurrentTime(),
  //       },
  //       {
  //         id: uuidv4(),
  //         sender: "bot",
  //         text: "✅ You're all set! Here's our main menu:",
  //         time: getCurrentTime(),
  //       },
  //     ]);

  //     setTimeout(() => {
  //       addBotMenu(MENU_CONFIG.main);
  //     }, 1000);
  //   } catch (err) {
  //     console.error("Error:", err);
  //     setMessages([
  //       {
  //         id: uuidv4(),
  //         sender: "bot",
  //         text: "⚠️ Something went wrong. Please refresh and try again.",
  //         time: getCurrentTime(),
  //       },
  //     ]);
  //   }
  // };


//   const handleUserInfoComplete = (userData) => {
//   const localUserId = uuidv4();
//   const localSessionId = uuidv4();

//   setUserName(userData.name);
//   setUserPhone(userData.phone);
//   setUserId(localUserId);
//   setSessionId(localSessionId);

//   setStage("mainMenu");
//   setShowInput(false);

//   setMessages([
//     {
//       id: uuidv4(),
//       sender: "bot",
//       text: `👋 Welcome ${userData.name}! I'm your Troudz Virtual Assistant.`,
//       time: getCurrentTime(),
//     },
//     {
//       id: uuidv4(),
//       sender: "bot",
//       text: "✅ You're all set! Here's our main menu:",
//       time: getCurrentTime(),
//     },
//   ]);

//   setTimeout(() => {
//     addBotMenu(MENU_CONFIG.main);
//   }, 1000);
// };

const handleUserInfoComplete = (userData) => {
  const generatedUserId = uuidv4();
  const generatedSessionId = uuidv4();

  setUserName(userData.name);
  setUserPhone(userData.phone);
  setUserId(generatedUserId);
  setSessionId(generatedSessionId);

  localStorage.setItem(
    "troudz_user",
    JSON.stringify({
      id: generatedUserId,
      sessionId: generatedSessionId,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
    })
  );

  setStage("mainMenu");
  setShowInput(false);

  setMessages([
    {
      id: uuidv4(),
      sender: "bot",
      text: `👋 Welcome ${userData.name}! I'm your Troudz Virtual Assistant.`,
      time: getCurrentTime(),
    },
    {
      id: uuidv4(),
      sender: "bot",
      text: "✅ You're all set! Here's our main menu:",
      time: getCurrentTime(),
    },
  ]);

  setTimeout(() => addBotMenu(MENU_CONFIG.main), 1000);
};


  // const handleSend = async () => {
  //   if (!input.trim() || isLoading) return;

  //   const userMsg = {
  //     id: uuidv4(),
  //     sender: "user",
  //     text: input,
  //     time: getCurrentTime(),
  //   };
  //   setMessages((prev) => [...prev, userMsg]);
  //   const currentInput = input;
  //   setInput("");

  //   if (stage === "chatting") {
  //     setIsLoading(true);
  //     setIsTyping(true);

  //     try {
  //       const res = await fetch(`${API_BASE}/conversations/message`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           user_message: currentInput,
  //           session_id: sessionId,
  //           user_id: userId,
  //           similarity_threshold: 0.1,
  //           max_chunks: 3,
  //         }),
  //       });

  //       if (!res.ok) {
  //         botReply({
  //           id: uuidv4(),
  //           sender: "bot",
  //           text: "⚠️ Sorry, I couldn't process your message. Please try again.",
  //           time: getCurrentTime(),
  //         });
  //         setIsLoading(false);
  //         setIsTyping(false);
  //         return;
  //       }

  //       const data = await res.json();

  //       streamText(data.response, () => {
  //         setIsLoading(false);
  //         setIsTyping(false);
  //       });
  //     } catch (err) {
  //       botReply({
  //         id: uuidv4(),
  //         sender: "bot",
  //         text: "⚠️ Server error, please try again later.",
  //         time: getCurrentTime(),
  //       });
  //       setIsLoading(false);
  //       setIsTyping(false);
  //     }
  //   }
  // };

  const handleSend = () => {
  if (!input.trim() || isLoading) return;

  const userMsg = {
    id: uuidv4(),
    sender: "user",
    text: input,
    time: getCurrentTime(),
  };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);
  setIsLoading(true);

  // Static bot response
  const staticReply =
    "🤖 Thanks for your message! Our team will get back to you shortly. Meanwhile, feel free to explore the menu for more information.";

  streamText(staticReply, () => {
    setIsTyping(false);
    setIsLoading(false);
  });
};


  const handleOptionClick = async (option) => {
    const userMsg = {
      id: uuidv4(),
      sender: "user",
      text: option.label,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (option.subMenu) {
      setStage("subMenu");
      setShowInput(false);
      addBotMenu(option.subMenu);
    } else if (option.freeInput) {
      setStage("chatting");
      setShowInput(true);

      botReply({
        id: uuidv4(),
        sender: "bot",
        text: "💬 Please type your query:",
        time: getCurrentTime(),
      });
    } else if (option.answer) {
      setShowInput(false);
      const fullAnswer =
        option.answer + (option.url ? `\n\n🔗 See more: ${option.url}` : "");

      botReply(
        {
          sender: "bot",
          text: fullAnswer,
          time: getCurrentTime(),
        },
        true
      );
    }
  };

  // const handleEndChat = () => {
  //   setIsMenuOpen(false);
  //   botReply({
  //     id: uuidv4(),
  //     sender: "bot",
  //     text: "👋 It was great chatting with you! Refresh anytime to restart.",
  //     time: getCurrentTime(),
  //   });
  // };

  const handleEndChat = () => {
  setIsMenuOpen(false);
  setStage("mainMenu");
  setShowInput(false);
  
  // Clear existing messages and show welcome messages
  setMessages([
    {
      id: uuidv4(),
      sender: "bot",
      text: `👋 Welcome ${userName}! I'm your Troudz Virtual Assistant.`,
      time: getCurrentTime(),
    },
    {
      id: uuidv4(),
      sender: "bot",
      text: "✅ You're all set! Here's our main menu:",
      time: getCurrentTime(),
    },
  ]);

  // Show main menu after a short delay
  setTimeout(() => {
    addBotMenu(MENU_CONFIG.main);
  }, 1000);
};

  const handleRefresh = () => {
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }
    setMessages([]);
    setInput("");
    setStage("userInfo");
    setUserName("");
    setUserPhone("");
    setUserId(null);
    setSessionId(null);
    setIsMenuOpen(false);
    setShowInput(false);
    setIsLoading(false);
    setStreamingMessage(null);
    setIsTyping(false);
  };

  const handleMainMenu = () => {
    setStage("mainMenu");
    setShowInput(false);
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: "📋 Main Menu:",
      time: getCurrentTime(),
    });
    addBotMenu(MENU_CONFIG.main);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const handleClose = () => {
  window.parent.postMessage({ type: 'CLOSE_CHATBOT' }, '*');
};

 // Function to toggle maximize/minimize
  const handleToggleMaximize = () => {
    const newMaximizedState = !isMaximized;
    
    // Add transitioning class for animation
    if (!newMaximizedState) {
      // When minimizing, add class briefly
      const chatPage = document.querySelector('.chat-page');
      if (chatPage) {
        chatPage.classList.add('minimizing');
        setTimeout(() => {
          chatPage.classList.remove('minimizing');
        }, 400);
      }
    }
    
    setIsMaximized(newMaximizedState);
    
    // Send message to parent window to toggle maximize
    window.parent.postMessage({ 
      type: 'TOGGLE_MAXIMIZE', 
      isMaximized: newMaximizedState 
    }, '*');
  };


  return (
    <div className={`chat-page ${isMaximized ? 'maximized' : ''}`}>
      <ChatHeader 
  onRefresh={handleRefresh}
  onClose={handleClose}
  onToggleMaximize={handleToggleMaximize}
  isMaximized={isMaximized}
/>

      {stage === "userInfo" ? (
        <UserInfoForm onComplete={handleUserInfoComplete} />
      ) : (
        <>
          <ChatMessages
            messages={messages}
            streamingMessage={streamingMessage}
            isTyping={isTyping}
            onOptionClick={handleOptionClick}
          />

          <div className="chat-bottom">
            <button
              className="home-btn"
              onClick={() => {
                if (!userName || !userPhone || !userId) {
                  botReply({
                    id: uuidv4(),
                    sender: "bot",
                    text: "⚠️ Please complete your details first.",
                    time: getCurrentTime(),
                  });
                  return;
                }
                setIsMenuOpen(true);
              }}
            >
              <HomeIcon size={20} color="white" />
            </button>

            {showInput && (
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={handleSend}
                isLoading={isLoading}
              />
            )}

            <div className="powered-by">
              Powered by{" "}
              <span>TROUDZ AI LABS</span> 
              {/* <a href="https://troudz.com/" target="_blank" rel="noopener noreferrer">
                TROUDZ AI LABS
              </a> */}
            </div>
          </div>

          <BottomSheet
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onEndChat={handleEndChat}
            onMainMenu={handleMainMenu}
          />
        </>
      )}
    </div>
  );
};

export default ChatPage;
