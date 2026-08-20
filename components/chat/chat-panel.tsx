"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import Image from "next/image";
import { ArrowRight, ArrowUp, X } from "lucide-react";

// TODO(F08): BLOCKER before launch — replace with the real WhatsApp Business
// number from the client; 255220511518 is the head-office landline and opens
// a dead conversation.
export const WHATSAPP_URL = "https://wa.me/255220511518";

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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ChatPanelProps {
  onClose: () => void;
  /** Launcher button to return focus to when the panel closes. */
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export function ChatPanel({ onClose, returnFocusRef }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the latest message / typing indicator.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Focus the input when the panel opens; return focus to the launcher on
  // close (only when focus was still inside the panel — unmounting leaves
  // activeElement on <body>).
  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      if (document.activeElement === document.body) {
        returnFocusRef?.current?.focus();
      }
    };
  }, [returnFocusRef]);

  // Escape closes the panel.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // In the mobile full-screen state the panel covers the page, so hide the
  // page behind it from assistive tech (the panel is a direct child of
  // <body>; every other body child except script/style belongs to the page).
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !window.matchMedia("(max-width: 639px)").matches) return;
    const hiddenSiblings: HTMLElement[] = [];
    for (const el of Array.from(document.body.children)) {
      if (el === panel || el.contains(panel)) continue;
      if (el.tagName === "SCRIPT" || el.tagName === "STYLE") continue;
      (el as HTMLElement).setAttribute("aria-hidden", "true");
      hiddenSiblings.push(el as HTMLElement);
    }
    return () => {
      hiddenSiblings.forEach((el) => el.removeAttribute("aria-hidden"));
    };
  }, []);

  // Focus trap: Tab / Shift+Tab cycle within the panel.
  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

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

  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Maendeleo Assistant chat"
      onKeyDown={onPanelKeyDown}
      className="mb-panel fixed inset-0 z-50 flex h-[100dvh] flex-col overflow-hidden bg-white sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(600px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-hairline sm:shadow-lift-2"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
        <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/Chat-Bot.png"
            alt=""
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-ink">
            Maendeleo Assistant
          </p>
          <p className="truncate text-xs text-ink-mute">
            Here to help with everything you need
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-brand-subdued hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Messages / empty state */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          /* Kimi-style welcome: centered hero + stacked starter pills */
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <span className="h-16 w-16 overflow-hidden rounded-full shadow-lift-2">
              <Image
                src="/Chat-Bot.png"
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
            <div className="space-y-1.5">
              <p className="font-heading text-heading-md text-ink">
                Karibu Maendeleo Bank
              </p>
              <p className="mx-auto max-w-64 text-sm text-ink-secondary">
                Ask us anything about accounts, loans, branches or digital
                banking — we&apos;re here to help.
              </p>
            </div>
            <div className="flex w-full max-w-72 flex-col gap-2.5">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="group flex min-h-11 items-center justify-between gap-3 rounded-full border border-hairline bg-white px-4 py-2.5 text-left text-sm text-ink transition-colors hover:border-brand hover:bg-brand-subdued focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="truncate">{prompt}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
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
        )}
      </div>

      {/* Input — pill bar with circular send, kimi.com style */}
      <form
        className="px-3 pt-1 pb-2"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <div className="flex items-center gap-2 rounded-full border border-hairline bg-canvas-soft py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-brand">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Andika swali lako / Type your question"
            aria-label="Type your question"
            maxLength={2000}
            enterKeyHint="send"
            className="h-9 min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Footer microcopy */}
      <div className="px-4 pb-2 text-center text-micro text-ink-mute">
        <p>
          AI assistant. For account-specific help call 0800750089 (toll free).
        </p>
        {/* On mobile the WhatsApp launcher collapses into the panel (F05). */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 inline-flex min-h-8 items-center font-medium text-brand-green-deep sm:hidden"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
