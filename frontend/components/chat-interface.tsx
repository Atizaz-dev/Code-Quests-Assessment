"use client";
import { useState } from "react";
import { askQuestion } from "@/lib/api";
import { Send, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
  sources?: string[];
};

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleAsk = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const data = await askQuestion(userMsg.content);
      const aiMsg: Message = { 
        role: "ai", 
        content: data.answer, 
        sources: data.sources 
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "ai", content: "Error fetching answer." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            Ask me anything about your documents...
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className={`p-2 rounded-full h-fit ${msg.role === "user" ? "bg-blue-500" : "bg-green-600"}`}>
              {msg.role === "user" ? <User size={16} className="text-white"/> : <Bot size={16} className="text-white"/>}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[80%] text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  <span className="font-semibold">Sources:</span> {msg.sources.join(", ")}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400 animate-pulse">Thinking...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          disabled={loading}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-black text-white p-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}