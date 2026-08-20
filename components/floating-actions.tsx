"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { ChatPanel } from "@/components/chat/chat-panel";

// TODO: confirm official WhatsApp business number with client — the bank's
// website shows a WhatsApp icon but publishes no number (see
// docs/maendeleo-bank-info/13-contact.md). Using the head-office line as a
// wa.me placeholder.
const WHATSAPP_URL = "https://wa.me/255220511518";

export function FloatingActions() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Never render on admin screens.
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Scoped keyframes: one-time pulse ring, panel entrance, typing dots.
          All disabled under prefers-reduced-motion. */}
      <style>{`
        @keyframes mb-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(132, 59, 141, 0.45); }
          100% { box-shadow: 0 0 0 18px rgba(132, 59, 141, 0); }
        }
        .mb-pulse-once { animation: mb-pulse-ring 1.8s ease-out 1 0.8s; }
        @keyframes mb-panel-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mb-panel { animation: mb-panel-in 180ms ease-out; }
        @keyframes mb-typing {
          0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
        .mb-typing-dot { animation: mb-typing 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mb-pulse-once, .mb-panel, .mb-typing-dot { animation: none; }
        }
      `}</style>

      {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}

      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
        {!isChatOpen && (
          <div className="group relative">
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              aria-label="Open Maendeleo Assistant"
              className="mb-pulse-once flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lift-2 transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </button>
            <span
              role="tooltip"
              className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-md bg-brand-plum px-2.5 py-1.5 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
            >
              Maendeleo Assistant
            </span>
          </div>
        )}

        <div className="group relative">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green shadow-lift-2 transition-colors hover:bg-brand-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
          >
            <Image
              src="/whatsapp.png"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] object-contain"
            />
          </a>
          <span
            role="tooltip"
            className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-md bg-brand-plum px-2.5 py-1.5 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            Chat on WhatsApp
          </span>
        </div>
      </div>
    </>
  );
}
