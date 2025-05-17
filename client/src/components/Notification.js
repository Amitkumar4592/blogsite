import React, { useEffect, useState } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type = 'success', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    
    setVisible(true);
    
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message || !visible) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
