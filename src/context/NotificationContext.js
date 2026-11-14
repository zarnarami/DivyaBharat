// src/context/NotificationContext.js — Real-Time Database Notification Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load initial notifications from MongoDB
  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      if (data && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        const unread = data.notifications.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      // Graceful offline fallback
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Connect to real-time Server-Sent Events (SSE) stream
    const streamUrl = `${api.defaults.baseURL || 'http://localhost:5000/api'}/notifications/stream`;
    let eventSource;

    try {
      eventSource = new EventSource(streamUrl);

      eventSource.onmessage = (event) => {
        try {
          const newNotif = JSON.parse(event.data);
          if (newNotif && newNotif._id) {
            setNotifications(prev => [newNotif, ...prev.filter(n => n._id !== newNotif._id)]);
            setUnreadCount(prev => prev + 1);
          }
        } catch (e) {
          // Heartbeat or malformed payload
        }
      };

      eventSource.onerror = () => {
        // Automatically attempts reconnect in background
      };
    } catch (err) {
      console.warn('SSE connection notice:', err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {}
  };

  const markAllRead = () => {
    notifications.forEach(n => {
      if (!n.isRead) markAsRead(n._id);
    });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllRead,
      refreshNotifications: fetchNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    return {
      notifications: [],
      unreadCount: 0,
      markAsRead: () => {},
      markAllRead: () => {},
      refreshNotifications: () => {}
    };
  }
  return context;
}

export default NotificationContext;
