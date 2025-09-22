import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiHome, FiX, FiRefreshCw } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { FaQuestion } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import logo from "../assets/logo02.svg";
import "./ChatPage.css";

const API_BASE =
  "http://ec2-13-54-7-23.ap-southeast-2.compute.amazonaws.com";

// ✅ Menu Config
const MENU_CONFIG = {
  main: {
    text: "Please choose an option:",
    options: [
      {
        label: "Products Information",
        icon: MdProductionQuantityLimits,
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
        icon: GrServices,
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
      {
        label: "Other Queries",
        icon: FaQuestion,
        freeInput: true,
      },
      {
        label: "Contact us",
        icon: RiContactsLine,
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
  const [stage, setStage] = useState("welcome");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [typing, setTyping] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [currentMenu, setCurrentMenu] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const botReply = (response) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 700);
  };

  // ✅ Show welcome messages properly
  const showWelcome = () => {
    setMessages([
      {
        id: uuidv4(),
        sender: "bot",
        text: "👋 Welcome to Troudz Virtual Assistant! I'm here to help you.",
        time: getCurrentTime(),
      },
      {
        id: uuidv4(),
        sender: "bot",
        text: "🙋 Hi! What's your name?",
        time: getCurrentTime(),
      },
    ]);
    setStage("askName"); // ✅ Important fix
  };

  useEffect(() => {
    showWelcome();
  }, []);

  const addBotMenu = (menu) => {
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: menu.text,
      options: menu.options,
      time: getCurrentTime(),
    });
  };

  const invalidNames = [
  "string",
  "your name",
  "name",
  "null",
  "none",
  "test",
  "user",
  "example",
  "hi",
  "hlo",
  "hello",
  "hai"
];

// 📧 Email validation
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// 📱 Phone validation: exactly 10 digits
const isValidPhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};


const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: uuidv4(),
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (stage === "askName") {
      const nameInput = input.trim();

      // 🚫 Name validation
      if (
        invalidNames.includes(nameInput.toLowerCase()) || // block invalid list
        !/^[a-zA-Z\s]+$/.test(nameInput) || // allow only letters & spaces
        nameInput.length < 2 // at least 2 characters
      ) {
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: "⚠️ That doesn’t look like a valid name. Please enter your real name.",
          time: getCurrentTime(),
        });
        setInput("");
        return;
      }

      setUserName(nameInput);
      setStage("askPhone");
      botReply({
        id: uuidv4(),
        sender: "bot",
        text: `📱 Great ${nameInput}! What's your phone number?`,
        time: getCurrentTime(),
      });
      setInput("");
      return;
    }

    if (stage === "askPhone") {
  const phoneInput = input.trim();

  if (!isValidPhone(phoneInput)) {
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: "⚠️ Please enter a valid 10-digit phone number (digits only).",
      time: getCurrentTime(),
    });
    setInput("");
    return;
  }

  setUserPhone(phoneInput);
  setStage("askEmail");
  botReply({
    id: uuidv4(),
    sender: "bot",
    text: `✉️ Thanks ${userName}! Please provide your email.`,
    time: getCurrentTime(),
  });
  setInput("");
  return;
}

    if (stage === "askEmail") {
      const email = input.trim();

      if (!isValidEmail(email)) {
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: "⚠️ Please enter a valid email address (example@domain.com).",
      time: getCurrentTime(),
    });
    setInput("");
    return;
  }
      try {
        const res = await fetch(`${API_BASE}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            phone_number: userPhone,
            email,
            additional_info: "",
          }),
        });

        // ✅ FIX: Check if backend returned error
        if (!res.ok) {
          botReply({
            id: uuidv4(),
            sender: "bot",
            text: "⚠️ Couldn’t create your profile. Please check your details and try again.",
            time: getCurrentTime(),
          });
          setInput("");
          return;
        }

        const data = await res.json();
        setUserId(data.UserID);

        // start conversation
        const res2 = await fetch(`${API_BASE}/conversations/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: data.UserID }),
        });
        const conv = await res2.json();
        setSessionId(conv.session_id);

        setStage("mainMenu");
        setShowInput(false);
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: "✅ You're all set! Here's our main menu:",
          time: getCurrentTime(),
        });
        addBotMenu(MENU_CONFIG.main);
      } catch (err) {
        console.error("Error:", err);
        botReply({
          id: uuidv4(),
          sender: "bot",
          text:
            "⚠️ Something went wrong while creating your profile. Please try again later.",
          time: getCurrentTime(),
        });
      }
      setInput("");
      return;
    }

    if (stage === "chatting") {
      try {
        const res = await fetch(`${API_BASE}/conversations/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_message: input,
            session_id: sessionId,
            user_id: userId,
            similarity_threshold: 0.3,
            max_chunks: 3,
          }),
        });

        if (!res.ok) {
          botReply({
            id: uuidv4(),
            sender: "bot",
            text: "⚠️ Sorry, I couldn’t process your message. Please try again.",
            time: getCurrentTime(),
          });
          setInput("");
          return;
        }

        const data = await res.json();
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: data.response,
          time: getCurrentTime(),
        });
      } catch (err) {
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: "⚠️ Server error, please try again later.",
          time: getCurrentTime(),
        });
      }
      setInput("");
    }
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
      setCurrentMenu(option.subMenu);
      setStage("subMenu");
      setShowInput(false);
      addBotMenu(option.subMenu);
    } else if (option.freeInput) {
      setStage("chatting");
      setShowInput(true);
      try {
        const res = await fetch(`${API_BASE}/conversations/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_message: "Other Queries",
            session_id: sessionId,
            user_id: userId,
          }),
        });
        const data = await res.json();
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: data.response || "💬 Please type your query below:",
          time: getCurrentTime(),
        });
      } catch {
        botReply({
          id: uuidv4(),
          sender: "bot",
          text: "💬 Please type your query below:",
          time: getCurrentTime(),
        });
      }
    } else if (option.answer) {
      setShowInput(false);
      botReply({
        id: uuidv4(),
        sender: "bot",
        text:
          option.answer +
          (option.url ? `\n\n🔗 See more: ${option.url}` : ""),
        time: getCurrentTime(),
      });
    }
  };

  const handleEndChat = () => {
    setIsMenuOpen(false);
    botReply({
      id: uuidv4(),
      sender: "bot",
      text: "👋 It was great chatting with you! Refresh anytime to restart.",
      time: getCurrentTime(),
    });
  };

  const handleRefresh = () => {
    setMessages([]);
    setInput("");
    setStage("welcome");
    setUserName("");
    setUserPhone("");
    setUserId(null);
    setSessionId(null);
    setIsMenuOpen(false);
    setShowInput(true);

    // ✅ Restart chat with welcome messages
    showWelcome();
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <img src={logo} alt="logo" className="chat-logo" />
        <div className="chat-header-text">
          <h3>Troudz Virtual Assistant</h3>
          <span className="online-status">● Online</span>
        </div>
        <button className="refresh-btn" onClick={handleRefresh}>
          <FiRefreshCw size={22} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <div className="message-content">
              <span>
                {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                  part.match(/https?:\/\//) ? (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat-link"
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
              </span>

              {msg.options && (
                <div className="options-container">
                  {msg.options.map((opt, i) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={i}
                        className="option-btn"
                        onClick={() => handleOptionClick(opt)}
                      >
                        {Icon && <Icon size={16} style={{ marginRight: 6 }} />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="message-time-right">{msg.time}</div>
          </div>
        ))}
        {typing && (
          <div className="message bot">
            <div className="message-content">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-bottom">
        <button
  className="home-btn"
  onClick={() => {
    if (!userName || !userPhone || !userId) {
      botReply({
        id: uuidv4(),
        sender: "bot",
        text: "⚠️ Please complete your details (name, phone, and email) before accessing the main menu.",
        time: getCurrentTime(),
      });
      return;
    }
    setIsMenuOpen(true);
  }}
>
  <FiHome size={24} />
</button>

        {showInput && (
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              placeholder={
                stage === "askName"
                  ? "Enter your name..."
                  : stage === "askPhone"
                  ? "Enter your phone number..."
                  : stage === "askEmail"
                  ? "Enter your email..."
                  : "Type a message..."
              }
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="send-btn">
              ➤
            </button>
          </div>
        )}
        <div className="powered-by">
          Powered by <a href="https://troudz.com/" target="_black">Troudz</a>
        </div>
      </div>

      {/* Bottom Sheet */}
      {isMenuOpen && (
        <div className="bottom-sheet">
          <div className="bottom-sheet-header">
            <h4>Shortcuts</h4>
            <FiX
              size={20}
              className="close-icon"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="bottom-sheet-option" onClick={handleEndChat}>
            End Chat
          </div>
          <div
            className="bottom-sheet-option"
            onClick={() => {
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
            }}
          >
            Main Menu
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
