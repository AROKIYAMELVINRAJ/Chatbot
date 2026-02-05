import React, { useState } from 'react';
import { UserIcon, PhoneIcon, MailIcon } from './icons';
import logo from '../../assets/favicon.ico'

const UserInfoForm = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1=name, 2=phone, 3=email
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false); // NEW: Track completion

  const invalidNames = [
    'string', 'your name', 'name', 'null', 'none', 'test',
    'user', 'example', 'hi', 'hlo', 'hello', 'hai'
  ];

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // NEW: Prevent multiple submissions
    if (isCompleted) return;
    
    const trimmedInput = input.trim();
    setError('');

    if (step === 1) {
      // Validate name
      if (
        invalidNames.includes(trimmedInput.toLowerCase()) ||
        !/^[a-zA-Z\s]+$/.test(trimmedInput) ||
        trimmedInput.length < 2
      ) {
        setError('Please enter a valid name');
        return;
      }
      setUserData({ ...userData, name: trimmedInput });
      setInput('');
      setStep(2);
    } else if (step === 2) {
      // Validate phone
      if (!isValidPhone(trimmedInput)) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }
      setUserData({ ...userData, phone: trimmedInput });
      setInput('');
      setStep(3);
    } else if (step === 3) {
      // Validate email
      if (!isValidEmail(trimmedInput)) {
        setError('Please enter a valid email address');
        return;
      }
      
      // NEW: Mark as completed before calling onComplete
      setIsCompleted(true);
      
      onComplete({
        name: userData.name,
        phone: userData.phone,
        email: trimmedInput
      });
    }
  };

  const getIcon = () => {
    if (step === 1) return <UserIcon size={24} color="#ffff" />;
    if (step === 2) return <PhoneIcon size={24} color="#ffff" />;
    return <MailIcon size={24} color="#fff" />;
  };

  const getPlaceholder = () => {
    if (step === 1) return 'Enter your name...';
    if (step === 2) return 'Enter your phone number...';
    return 'Enter your email address...';
  };

  const getLabel = () => {
    if (step === 1) return "What's your name?";
    if (step === 2) return `Great ${userData.name}! Your phone number?`;
    return 'Almost there! Your email?';
  };

 return (
  <div className="user-info-form-container">
    <div className="form-wrapper">
      <div className="user-info-form">
        <div className="form-icon-wrapper">
          {getIcon()}
        </div>
        <h3 className="form-label">{getLabel()}</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="form-input"
              autoFocus
              disabled={isCompleted}
            />
            <button 
              type="submit" 
              className="form-submit-btn"
              disabled={isCompleted}
            >
              {step === 3 ? 'Complete' : 'Next'}
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
        </form>
        <div className="form-progress">
          <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>
      </div>
      
      {/* Moved outside the user-info-form */}
      <div className="powered-by1">
        Powered by <img src={logo} alt="Logo" /> <span>TROUDZ AI LABS</span> 
      </div>
    </div>
  </div>
);
};

export default UserInfoForm;