import React from 'react';
import './OnlineStatus.css';

const OnlineStatus = ({ 
  status, 
  lastSeenAt, 
  lastSeenText, 
  showText = false, 
  size = 'small' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return '#10B981'; // Green
      case 'away':
        return '#F59E0B'; // Yellow
      default:
        return '#6B7280'; // Gray
    }
  };

  const getStatusText = () => {
    if (lastSeenText) return lastSeenText;
    
    switch (status) {
      case 'online':
        return 'Online now';
      case 'away':
        return 'Away';
      default:
        return 'Offline';
    }
  };

  return (
    <div className={`online-status ${size}`}>
      <div 
        className={`status-indicator ${status}`}
        style={{ backgroundColor: getStatusColor() }}
        title={getStatusText()}
      />
      {showText && (
        <span className="status-text">
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

export default OnlineStatus;