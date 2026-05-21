'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/app/store/authStore';
import './HealthChatbot.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

export default function HealthChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot'|'user', text: string}[]>([
    { sender: 'bot', text: 'Hi! I am the Min Doktor AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Only show to patients
  const { role, isAuthenticated } = useAuthStore();
  if (!isAuthenticated || role !== 'PATIENT') return null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages.slice(-5) }) // Send last 5 msgs
      });
      
      const data = await res.json();
      
      if (data.is_emergency) {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `🚨 ${data.reply}`
        }]);
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (err) {
      // Fallback if backend is down
      setTimeout(() => {
        const isEmergency = userMsg.toLowerCase().match(/(chest pain|heart attack|suicide|bleeding)/);
        if (isEmergency) {
          setMessages(prev => [...prev, { sender: 'bot', text: '🚨 This sounds like an emergency. Please call 112 immediately or go to the nearest emergency room.' }]);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: 'I understand. Based on what you told me, you might want to start a new triage assessment to get matched with a doctor.' }]);
        }
        setLoading(false);
      }, 1000);
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        💬 AI Help
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="chatbot-header">
              <h3>Min Doktor AI</h3>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-bubble chatbot-bubble--${m.sender}`}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="chatbot-bubble chatbot-bubble--bot">Typing...</div>}
            </div>

            <div className="chatbot-input">
              <input 
                type="text" 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a health question..."
              />
              <button onClick={sendMessage} disabled={loading || !input.trim()}>
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
