import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Loader2, Sparkles } from 'lucide-react';
import { aiService } from '../services/aiService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export const AIAssistant: React.FC = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/privefi', '_blank', 'noopener,noreferrer');
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Welcome to PrivéFi! I'm your AI Investment Assistant. I can help you explore our luxury asset vaults, compare investment options, and answer questions about yields, security, and blockchain transparency. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions = [
    "How secure are these vaults?",
    "Compare JetLease vs YachtLease",
    "What are the minimum investments?",
    "How do payouts work?",
    "Tell me about blockchain verification"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hide suggestions after user sends first message
  useEffect(() => {
    if (messages.length > 1) {
      setShowSuggestions(false);
    }
  }, [messages.length]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false); // Hide suggestions when user starts chatting

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Prepare conversation history for AI
      const conversationHistory = messages
        .filter(msg => !msg.isLoading)
        .map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }));

      // Add current user message
      conversationHistory.push({
        role: 'user',
        content: content.trim()
      });

      // Get AI response
      const aiResponse = await aiService.generateResponse(conversationHistory);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: aiResponse.content,
          timestamp: new Date()
        }];
      });

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove loading message and add fallback response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: aiService.getFallbackResponse(content),
          timestamp: new Date()
        }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleSuggestionClick = (question: string) => {
    handleSendMessage(question);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white p-5 rounded-full shadow-2xl shadow-purple-500/25 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 ease-in-out z-40 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 group"
      >
        <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[420px] h-[650px] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl shadow-2xl border border-zinc-700 z-50 flex flex-col backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white p-6 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Investment Assistant</h3>
                <p className="text-xs opacity-90">Powered by PrivéFi AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white ml-auto rounded-br-md'
                      : 'bg-zinc-700/80 text-slate-100 border border-zinc-600/50 rounded-bl-md backdrop-blur-sm'
                  }`}
                >
                  {message.isLoading ? (
                    <div className="flex items-center space-x-3 py-2">
                      <Bot className="h-4 w-4 text-purple-400 flex-shrink-0" />
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                        <span className="text-sm text-slate-300">Analyzing your question...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      {message.type === 'ai' && (
                        <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-purple-400" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-1 flex-shrink-0" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions - Only show initially or when explicitly requested */}
          {showSuggestions && (
            <div className="px-6 py-4 border-t border-zinc-700/50">
              <div className="mb-3">
                <p className="text-xs text-slate-400 font-medium">Quick questions to get started:</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {predefinedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    disabled={isTyping}
                    className="text-left text-xs bg-zinc-700/50 hover:bg-zinc-600/50 text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out border border-zinc-600/30 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-xs text-slate-500 hover:text-slate-400 mt-2 transition-colors"
              >
                Hide suggestions
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-zinc-700/50">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  placeholder="Ask me anything about investments..."
                  className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 transition-all duration-300 ease-in-out"
                />
                {!showSuggestions && !isTyping && (
                  <button
                    onClick={() => setShowSuggestions(true)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors duration-300 ease-in-out"
                    title="Show suggestions"
                  >
                    <Sparkles className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isTyping || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Demo CTA */}
          <div className="p-6 border-t border-zinc-700/50 bg-zinc-800/30 rounded-b-3xl">
            <button 
              onClick={openCalendly}
              className="w-full text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors duration-300 ease-in-out hover:bg-purple-500/10 py-2 rounded-lg"
            >
              Need personalized advice? Book Demo Call →
            </button>
          </div>
        </div>
      )}
    </>
  );
};