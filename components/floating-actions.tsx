"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChatPanel } from "@/components/chat/chat-panel";

export function FloatingActions() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Never render on admin screens.
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Scoped keyframes: gentle bob on the launcher, panel entrance, typing
          dots. All disabled under prefers-reduced-motion. */}
      <style>{`
        @keyframes mb-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .mb-float { animation: mb-float 2.8s ease-in-out infinite; }
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
          .mb-float, .mb-panel, .mb-typing-dot { animation: none; }
        }
      `}</style>

      {isChatOpen && (
        <ChatPanel
          onClose={() => setIsChatOpen(false)}
          returnFocusRef={launcherRef}
        />
      )}

      {/* Permanent launcher: always visible (never hides on scroll). */}
      <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        {!isChatOpen && (
          <div className="mb-float flex items-center gap-3">
            <span className="pointer-events-none rounded-full border border-hairline bg-white px-3.5 py-2 text-xs font-medium whitespace-nowrap text-ink shadow-lift-2">
              Let&apos;s Chat
            </span>
            <button
              ref={launcherRef}
              type="button"
              onClick={() => setIsChatOpen(true)}
              aria-label="Open Maendeleo Assistant — Let's Chat"
              className="block h-14 w-14 overflow-hidden rounded-full bg-white shadow-lift-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-16 sm:w-16"
            >
              <Image
                src="/Chat-Bot.png"
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
