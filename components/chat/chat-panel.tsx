"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SendHorizontal, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "How do I open an account?",
  "Nawezaje kupata mkopo?",
  "What is the USSD code?",
  "Branch za Maendeleo zipo wapi?",
];

const ERROR_REPLY =
  "Samahani, something went wrong. Please try again, or call us toll free on 0800750089.\n" +
  "Kunatatizo kidogo. Jaribu tena, au tupigie bure 0800750089.";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message / typing indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Focus the input when the panel opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape closes the panel.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });
        if (!res.ok) throw new Error(`Chat API ${res.status}`);
        const data: { reply?: string } = await res.json();
        const reply = typeof data.reply === "string" ? data.reply : "";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: reply || ERROR_REPLY },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: ERROR_REPLY },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading],
  );

  return (
    <div
      role="dialog"
      aria-label="Maendeleo Assistant chat"
      className="mb-panel fixed inset-0 z-50 flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(600px,calc(100dvh-8rem))] sm:w-[380px] sm:rounded-2xl sm:shadow-lift-2"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-brand-plum px-4 py-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
          <Image
            src="/Maendeleo-Bank-Favicon.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-white">
            Maendeleo Assistant
          </p>
          <p className="truncate text-xs text-white/70">
            Inakusaidia kwa Kiswahili na English
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-brand-subdued px-3.5 py-2.5 text-sm leading-relaxed text-ink">
              <span className="block">
                Karibu! Ask me anything about Maendeleo Bank — accounts,
                loans, branches, digital banking.
              </span>
              <span className="mt-1 block">
                Uliza chochote kuhusu Maendeleo Bank.
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="rounded-full border border-brand px-3 py-1.5 text-xs text-brand transition-colors hover:bg-brand-subdued focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-brand px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-white"
                : "max-w-[85%] rounded-2xl rounded-tl-md bg-brand-subdued px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-ink"
            }
          >
            {message.content}
          </div>
        ))}

        {isLoading && (
          <div
            className="flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tl-md bg-brand-subdued px-3.5 py-3"
            aria-label="Assistant is typing"
          >
            <span className="mb-typing-dot h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="mb-typing-dot h-1.5 w-1.5 rounded-full bg-brand [animation-delay:150ms]" />
            <span className="mb-typing-dot h-1.5 w-1.5 rounded-full bg-brand [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-hairline px-3 py-2.5"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Andika swali lako / Type your question"
          aria-label="Type your question"
          maxLength={2000}
          className="h-10 min-w-0 flex-1 rounded-md border border-hairline bg-white px-3 text-sm text-ink placeholder:text-ink-mute focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      {/* Footer microcopy */}
      <p className="border-t border-hairline px-4 py-2 text-center text-[11px] leading-snug text-ink-mute">
        AI assistant — for account-specific help call 0800750089 (toll free).
      </p>
    </div>
  );
}
