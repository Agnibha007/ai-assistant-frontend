'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'ai' | 'user';
  content: string;
  taskId?: string;
  status?: string;
  logs?: string[];
}

interface Task {
  id: string;
  description: string;
  status: string;
  result?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Hello! I am your AI Desktop Assistant. I can help you automate tasks, write code, and control applications. What would you like me to do?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(updateRunningTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/tasks/`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const updateRunningTasks = async () => {
    setMessages(prev => {
      const newMessages = [...prev];
      let changed = false;
      
      prev.forEach(async (msg, idx) => {
        if (msg.role === 'ai' && msg.taskId && msg.status !== 'completed' && msg.status !== 'failed') {
          try {
            const res = await fetch(`${API_URL}/api/v1/tasks/${msg.taskId}`);
            if (res.ok) {
              const task = await res.json();
              if (task.status !== msg.status) {
                newMessages[idx] = { ...msg, status: task.status, content: task.result || msg.content };
                setMessages([...newMessages]);
                fetchTasks();
              }
            }
          } catch (e) {
            console.error('Error polling task:', e);
          }
        }
      });
      return prev;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsProcessing(true);

    try {
      const res = await fetch(`${API_URL}/api/v1/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: userMsg })
      });

      if (res.ok) {
        const task = await res.json();
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: 'Initializing task...', 
          taskId: task.id, 
          status: 'pending' 
        }]);
        fetchTasks();
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error starting that task.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Connection error. Please ensure the backend is running.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-800 flex flex-col bg-gray-950">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-lg font-bold tracking-tight">AI Assistant</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Recent Tasks</h2>
            <div className="space-y-2">
              {tasks.length === 0 && <p className="text-xs text-gray-600 px-2 italic">No tasks yet</p>}
              {tasks.map(task => (
                <div key={task.id} className="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-xs cursor-default group hover:border-gray-700 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-gray-400 truncate flex-1 pr-2">{task.description}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                      task.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                      task.status === 'running' ? 'bg-blue-900/30 text-blue-400 animate-pulse' :
                      task.status === 'failed' ? 'bg-red-900/30 text-red-400' :
                      'bg-gray-800 text-gray-500'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            <span>System Status</span>
            <span className="text-green-500">Online</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-lg ${
                  msg.role === 'ai' ? 'bg-blue-600' : 'bg-gray-700'
                }`}>
                  {msg.role === 'ai' ? 'AI' : 'U'}
                </div>
                <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                  <div className={`p-4 rounded-2xl shadow-sm border ${
                    msg.role === 'ai' 
                      ? 'bg-gray-800 border-gray-700 rounded-tl-none' 
                      : 'bg-blue-600 border-blue-500 rounded-tr-none'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    
                    {msg.status && msg.status !== 'completed' && msg.status !== 'failed' && (
                      <div className="mt-4 bg-black/50 p-3 rounded-lg border border-gray-700 font-mono text-[10px] text-blue-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                          <span>Status: {msg.status}...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-gray-800 bg-gray-950/50 backdrop-blur-md">
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-end bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-2xl">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent p-5 outline-none resize-none min-h-[60px] max-h-[200px] text-sm"
                placeholder="Instruct the assistant (e.g., 'Check my emails', 'Organize my desktop')..."
                rows={1}
              />
              <div className="p-3">
                <button 
                  onClick={handleSend}
                  disabled={isProcessing || !input.trim()}
                  className={`p-3 rounded-xl transition-all ${
                    isProcessing || !input.trim() 
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                      : 'bg-white text-black hover:bg-gray-200 active:scale-95 shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-widest">
              Live OS Control Enabled • Review commands carefully
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
