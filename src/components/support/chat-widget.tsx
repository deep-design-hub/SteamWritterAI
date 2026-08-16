"use client";

import Link from "next/link";
import * as React from "react";
import { MessageCircle, X, Send, Bot, User, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/ui/icon";
import { matchIntent } from "@/lib/support-kb";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  link?: { label: string; href: string };
}

const QUICK_REPLIES = [
  { label: "💰 Pricing", query: "What are the pricing plans?" },
  { label: "💳 How to pay", query: "How do I pay?" },
  { label: "⚡ Features", query: "What features does SteamWriterAi have?" },
  { label: "🚀 Get started", query: "How do I get started?" },
  { label: "🤖 AI models", query: "Which AI models do you use?" },
  { label: "👤 Live agent", query: "I want to talk to a human agent" },
];

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! I'm the SteamWriterAi assistant. I can help you with pricing, features, payments, navigation or anything about the project. What would you like to know?",
    },
  ]);
  const [liveAgent, setLiveAgent] = React.useState(false);
  const [liveName, setLiveName] = React.useState("");
  const [liveEmail, setLiveEmail] = React.useState("");
  const [liveSubject, setLiveSubject] = React.useState("");
  const [liveMessage, setLiveMessage] = React.useState("");
  const [liveSent, setLiveSent] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, liveAgent]);

  function uid() {
    return `m${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  }

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: uid(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const { answer, followUp } = matchIntent(text);
    const botMsg: Message = { id: uid(), role: "bot", text: answer };
    if (followUp === "LIVE_AGENT") {
      setLiveAgent(true);
    } else if (followUp) {
      const linkPart = followUp.match(/Visit (\/[\w-]+)/);
      botMsg.link = {
        label: linkPart ? `Go to ${linkPart[1]}` : "Learn more",
        href: linkPart ? linkPart[1] : "/",
      };
    }
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 300);
  }

  function handleLiveSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `Live Agent Request\n\nName: ${liveName}\nEmail: ${liveEmail}\n\n${liveMessage}`
    );
    window.location.href = `mailto:hello@steamwriterai.com?subject=${encodeURIComponent(
      `Live Agent: ${liveSubject || "Support request"}`
    )}&body=${body}`;
    setLiveSent(true);
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "bot",
        text: "Your support request has been sent! Our team typically responds within a few hours. You can also call us at +234 905 644 4277 (Mon–Sat, 7AM–9PM WAT).",
      },
    ]);
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 z-[90] w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border bg-card shadow-2xl">
          {/* Header */}
          <div className="bg-primary text-primary-foreground flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold">SteamWriterAi Assistant</p>
                <p className="text-primary-foreground/80 text-[10px]">
                  AI-powered · Ask anything
                </p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="size-7 text-primary-foreground hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex h-[340px] flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full">
                    <Bot className="size-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.text}
                  {msg.link && (
                    <Link
                      href={msg.link.href}
                      className="text-primary mt-1 flex items-center gap-1 text-xs font-medium hover:underline"
                    >
                      {msg.link.label} <ExternalLink className="size-3" />
                    </Link>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full">
                    <User className="size-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Live agent form */}
            {liveAgent && !liveSent && (
              <div className="bg-primary/5 mt-2 space-y-2 rounded-xl border p-3">
                <p className="text-xs font-bold">Request Live Agent Support</p>
                <Input
                  placeholder="Your name"
                  value={liveName}
                  onChange={(e) => setLiveName(e.target.value)}
                  className="h-8 text-xs"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={liveEmail}
                  onChange={(e) => setLiveEmail(e.target.value)}
                  className="h-8 text-xs"
                />
                <Input
                  placeholder="Subject"
                  value={liveSubject}
                  onChange={(e) => setLiveSubject(e.target.value)}
                  className="h-8 text-xs"
                />
                <textarea
                  placeholder="How can we help?"
                  rows={3}
                  value={liveMessage}
                  onChange={(e) => setLiveMessage(e.target.value)}
                  className="border-input bg-background w-full rounded-md border px-2 py-1 text-xs"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      const body = encodeURIComponent(
                        `Name: ${liveName}\nEmail: ${liveEmail}\nSubject: ${liveSubject}\n\n${liveMessage}`
                      );
                      window.location.href = `mailto:hello@steamwriterai.com?subject=${encodeURIComponent(
                        liveSubject || "Live Agent Request"
                      )}&body=${body}`;
                      setLiveSent(true);
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: uid(),
                          role: "bot",
                          text: "Your request has been sent! Our team at hello@steamwriterai.com will respond within a few hours. Is there anything else I can help with in the meantime?",
                        },
                      ]);
                    }}
                  >
                    <Send className="size-3" /> Send request
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => setLiveAgent(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {liveSent && (
              <div className="bg-primary/5 rounded-xl border p-3 text-xs font-medium">
                ✅ Live agent request sent — hello@steamwriterai.com will respond soon.
              </div>
            )}
          </div>

          {/* Quick replies */}
          {!liveAgent && (
            <div className="flex flex-wrap gap-1.5 border-t px-4 py-2">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.label}
                  onClick={() => send(qr.query)}
                  className="bg-muted hover:bg-primary/10 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t px-3 py-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about SteamWriterAi…"
              className="flex-1 text-sm"
            />
            <Button
              size="icon"
              className="size-9"
              onClick={() => send(input)}
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-[90] size-14 rounded-full bg-primary shadow-xl hover:bg-primary/90"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="size-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="size-6 text-primary-foreground" />
        )}
      </Button>
    </>
  );
}
