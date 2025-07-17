import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: fixed;
  background-color: #ffffff;
  color: #000000;
  padding: 12px 16px;
  border: 3px solid #000000;
  border-radius: 0;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 9999;
  white-space: nowrap;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: none;
  transition: opacity 0.2s ease-in-out;
  min-width: 100px;
  text-align: center;
  
  /* Add subtle arrow pointing down */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #000000;
  }
  
  /* Inner arrow for background */
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-3px);
    border: 5px solid transparent;
    border-top-color: #ffffff;
  }
`;

const MapTooltip = ({ content, position, visible }) => {
  if (!visible || !position || !content) {
    return null;
  }

  return (
    <TooltipContainer
      visible={visible}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {content}
    </TooltipContainer>
  );
};

export default MapTooltip;