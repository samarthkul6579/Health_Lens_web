"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  references?: string[];
}

const suggestedQuestions = [
  "Explain my CBC report",
  "What changed from my previous report?",
  "Which values need attention?",
  "What should I ask my doctor?",
];

const mockAnswers: Record<string, { text: string; references?: string[] }> = {
  "Explain my CBC report": {
    text: "Based on your CBC (Complete Blood Count) from July 10, all levels are within normal range except for **Hemoglobin**, which is **11.5 g/dL** (the normal female range is 12.0 - 16.0 g/dL). This indicates a mild anemia, which is commonly caused by low iron levels.",
    references: ["CBC_Report_July_10_2026.pdf"],
  },
  "What changed from my previous report?": {
    text: "Comparing your July 10 Lipid Panel with your previous test on May 12: \n\n* **Total Cholesterol** decreased from **230 mg/dL** to **215 mg/dL** (-15 mg/dL).\n* **LDL ('bad') Cholesterol** decreased from **150 mg/dL** to **135 mg/dL** (-15 mg/dL).\n* **HDL ('good') Cholesterol** remained stable at **60 mg/dL**.\n\nYour overall cardiovascular metrics are improving, likely due to your active diet adjustments.",
    references: ["Lipid_Panel_July_10_2026.pdf", "Lipid_Panel_May_12_2026.pdf"],
  },
  "Which values need attention?": {
    text: "There are two borderline markers across your uploaded reports:\n\n1. **Hemoglobin (11.5 g/dL)** - Slightly below the 12.0 g/dL threshold.\n2. **LDL Cholesterol (135 mg/dL)** - Above the optimal target of 100 mg/dL.\n\nAll other parameters (kidney, liver, and blood counts) are fully normal.",
    references: ["CBC_Report_July_10_2026.pdf", "Lipid_Panel_July_10_2026.pdf"],
  },
  "What should I ask my doctor?": {
    text: "Here are the top three questions generated for your next visit based on your reports:\n\n* 'Could my hemoglobin of 11.5 g/dL explain the mild fatigue I have felt recently?'\n* 'Since my LDL dropped from 150 to 135 in 2 months, should we check again in 3 months before exploring medication?'\n* 'Are there specific iron-rich foods or supplements you suggest based on my blood count?'",
    references: ["AI_Health_Insights_Summary.pdf"],
  },
};

export default function AICopilotChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am your HealthLens Copilot. I can help explain your uploaded medical reports, highlight trends, and prepare questions for your doctor. What would you like to discuss today?",
      timestamp: "12:00 PM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToEnd();
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse: { text: string; references?: string[] } = {
        text: "I've analyzed your question. While I'm in demo mode, I can tell you that HealthLens uses clinical-grade NLP models to understand these specific markers and compare them. Please use our preloaded suggested questions to see live report analyses.",
        references: ["Demo_Database.pdf"],
      };

      // Match suggested questions
      const matched = mockAnswers[text];
      if (matched) {
        botResponse = matched;
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: "bot",
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        references: botResponse.references,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hello! I am your HealthLens Copilot. I can help explain your uploaded medical reports, highlight trends, and prepare questions for your doctor. What would you like to discuss today?",
        timestamp: "12:00 PM",
      },
    ]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-[24px] border border-border-pale bg-white shadow-premium overflow-hidden flex flex-col h-[520px]">
      {/* Widget Header */}
      <div className="px-6 py-4.5 bg-bg-pale/80 border-b border-border-pale/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary-blue/10 text-primary-blue">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-deep-blue">HealthLens Copilot</h4>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Active Dashboard
            </span>
          </div>
        </div>
        <button
          onClick={handleResetChat}
          className="p-2 rounded-full border border-border-pale text-text-secondary hover:text-primary-blue hover:bg-white transition-colors cursor-pointer"
          title="Reset Conversation"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end gap-3 max-w-[85%]",
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold",
                msg.sender === "user"
                  ? "bg-bg-pale text-primary-blue border-primary-blue/15"
                  : "bg-primary-blue text-white border-primary-blue"
              )}
            >
              {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Text Box */}
            <div className="space-y-1.5">
              <div
                className={cn(
                  "p-4.5 rounded-[20px] text-sm leading-relaxed",
                  msg.sender === "user"
                    ? "bg-primary-blue text-white rounded-br-none"
                    : "bg-bg-pale/80 text-deep-blue border border-border-pale/60 rounded-bl-none"
                )}
              >
                {/* Simple bullet points support */}
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {line.startsWith("* ") ? (
                      <span className="flex items-start gap-1">
                        <span className="text-primary-blue mt-1.5 shrink-0">•</span>
                        <span>{line.replace("* ", "")}</span>
                      </span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>

              {/* Source References */}
              {msg.references && msg.references.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-text-secondary pl-2">
                  <span className="font-bold">References:</span>
                  {msg.references.map((ref, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-border-pale/40 border border-border-pale text-deep-blue font-semibold"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-primary-blue/10 bg-bg-pale text-primary-blue">
              <Bot size={14} />
            </div>
            <div className="p-4 rounded-[20px] rounded-bl-none bg-bg-pale/80 border border-border-pale/60 flex gap-1 items-center py-3 px-4.5">
              <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions Grid (Only visible if last message is from bot) */}
      {messages[messages.length - 1]?.sender === "bot" && !isTyping && (
        <div className="px-6 py-3 bg-bg-pale/30 border-t border-border-pale/40">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-2">
            Ask standard questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="text-xs font-semibold text-primary-blue hover:text-white px-3 py-1.5 rounded-full border border-primary-blue/20 bg-white hover:bg-primary-blue hover:border-primary-blue transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat input footer */}
      <div className="px-6 py-4.5 bg-white border-t border-border-pale flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your blood count, cholesterol ratios..."
            className="flex-grow p-3 px-4.5 rounded-full bg-bg-pale border border-border-pale focus:outline-none focus:border-primary-blue text-sm text-deep-blue placeholder:text-text-secondary/60"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="p-3 bg-primary-blue hover:bg-deep-blue text-white rounded-full transition-all duration-200 cursor-pointer shadow-premium"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-secondary justify-center">
          <AlertCircle size={12} className="text-text-secondary/80" />
          <span>Informational assistant only. Always consult a physician for diagnoses.</span>
        </div>
      </div>
    </div>
  );
}
