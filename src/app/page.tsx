import React from 'react';

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col bg-gray-950">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">AI Desktop</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tasks</h2>
            <ul className="space-y-1">
              <li className="px-2 py-1.5 bg-gray-800 rounded text-sm cursor-pointer">Data Extraction</li>
              <li className="px-2 py-1.5 hover:bg-gray-800 rounded text-sm cursor-pointer text-gray-400">System Cleanup</li>
              <li className="px-2 py-1.5 hover:bg-gray-800 rounded text-sm cursor-pointer text-gray-400">Browser Automation</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</h2>
            <ul className="space-y-1">
              <li className="px-2 py-1.5 hover:bg-gray-800 rounded text-sm cursor-pointer text-gray-400">Providers</li>
              <li className="px-2 py-1.5 hover:bg-gray-800 rounded text-sm cursor-pointer text-gray-400">Permissions</li>
            </ul>
          </div>
        </div>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          Status: Connected
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex items-start max-w-3xl mx-auto space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <div className="flex-1">
              <p className="bg-gray-800 border border-gray-700 p-4 rounded-lg rounded-tl-none shadow-sm">
                Hello! I am your AI Desktop Assistant. I can help you automate tasks, write code, and control applications. What would you like me to do?
              </p>
            </div>
          </div>
          <div className="flex items-start max-w-3xl mx-auto space-x-4 flex-row-reverse space-x-reverse">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-sm">
              U
            </div>
            <div className="flex-1 text-right">
              <p className="bg-blue-600 p-4 rounded-lg rounded-tr-none shadow-sm text-left inline-block">
                Can you open my browser and search for the latest AI news?
              </p>
            </div>
          </div>
          <div className="flex items-start max-w-3xl mx-auto space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <div className="flex-1">
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg rounded-tl-none shadow-sm space-y-3">
                <p>Sure, I am initializing the browser automation sequence.</p>
                <div className="bg-black p-3 rounded text-xs font-mono text-green-400 space-y-1">
                  <div>&gt; task: init_browser</div>
                  <div>&gt; opening Playwright session... OK</div>
                  <div>&gt; navigating to news.google.com...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-800 bg-gray-950">
          <div className="max-w-4xl mx-auto flex items-end bg-gray-900 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <textarea 
              className="flex-1 bg-transparent p-4 outline-none resize-none min-h-[60px] max-h-[200px]"
              placeholder="Ask me to automate a task..."
              rows={1}
            />
            <div className="p-3">
              <button className="bg-white text-black p-2 rounded hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
            AI Assistant has full desktop access. Please review dangerous commands before execution.
          </p>
        </div>
      </div>
    </div>
  );
}
