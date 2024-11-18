import React from 'react';
import { ChatBot as SimpleChatBot } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './Chatbot.css';

// Define chatbot steps
const steps = [
  {
    id: '1',
    message: 'Hello! How can I assist you today?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'order', label: 'Track My Order', trigger: '3' },
      { value: 'help', label: 'I need help', trigger: '4' },
      { value: 'promo', label: 'Know About Promo Codes', trigger: '5' },
    ],
  },
  {
    id: '3',
    message: 'Please provide your order ID.',
    end: true,
  },
  {
    id: '4',
    message: 'Our support team is here to help. Call us at 1800-123-456.',
    end: true,
  },
  {
    id: '5',
    message: 'Promo codes are available in the Promo section. Check it out!',
    end: true,
  },
];

// Define chatbot theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#6c63ff',
  headerFontColor: '#fff',
  headerFontSize: '18px',
  botBubbleColor: '#6c63ff',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatBot = () => {
  return (
    <ThemeProvider theme={theme}>
      <SimpleChatBot steps={steps} />
    </ThemeProvider>
  );
};

export default ChatBot;
