import React from 'react';
import { ProductIcon, ServiceIcon, QuestionIcon, ContactIcon } from './icons';

const getIconComponent = (iconName) => {
  const iconMap = {
    ProductIcon,
    ServiceIcon,
    QuestionIcon,
    ContactIcon
  };
  return iconMap[iconName];
};

const OptionButtons = ({ options, onOptionClick }) => {
  return (
    <div className="options-container">
      {options.map((opt, i) => {
        const IconComponent = opt.icon ? getIconComponent(opt.icon.name) : null;
        return (
          <button
            key={i}
            className="option-btn"
            onClick={() => onOptionClick(opt)}
          >
            {IconComponent && <IconComponent size={16} color="white" />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default OptionButtons;
