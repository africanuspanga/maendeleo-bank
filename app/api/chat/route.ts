import OpenAI from "openai";
import { BANK_KNOWLEDGE } from "@/lib/bank-knowledge";

export const runtime = "nodejs";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MAX_HISTORY = 12;
const MAX_CONTENT_LENGTH = 2000;

const FALLBACK_REPLY =
  "Samahani, the assistant is not available right now. Please call us toll free on 0800750089 or email info@maendeleobank.co.tz and we will be happy to help.\n\n" +
  "Sorry, the assistant is temporarily unavailable. Tupigie bure 0800750089 au tutumie barua pepe info@maendeleobank.co.tz na tutakusaidia.";

const SYSTEM_PROMPT = `You are "Maendeleo Assistant", the official AI helper of Maendeleo Bank PLC, Tanzania.

Language: detect the user's language and answer in the SAME language (Swahili or English). The user may mix languages; always follow the language of their latest message.

Style: short, clean, simple sentences. Warm and professional. Plain text only, NEVER use markdown: no asterisks, no hashes, no bold, no headers, no code formatting. Use simple line breaks, and "- " hyphen bullets only when listing items. Keep answers under about 120 words unless the user explicitly asks for more detail.

Scope: only answer questions about Maendeleo Bank and its services, plus basic Tanzanian banking guidance. Politely decline anything else and steer the user back to the bank's services.

Accuracy: never invent figures, interest rates, fees, dates, or product terms. The bank does not publish numeric interest rates, for any rate or fee question, direct the user to any Maendeleo Bank branch or the toll-free line 0800750089. If the knowledge base flags something as uncertain or time-sensitive, say it should be confirmed with the bank.

Limits: never give financial advice and never handle account-specific data (balances, statements, PINs, disputes). For those, direct the user to toll-free 0800750089 or info@maendeleobank.co.tz.

Below is the verified bank knowledge base. Answer only from it; if something is not covered, say you are not sure and offer the toll-free line or email.

${BANK_KNOWLEDGE}`;

/** Defensive: ensure no markdown emphasis can ever reach the chat UI. */
function sanitizeReply(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/##/g, "")
    .replace(/`/g, "")
    .replace(/^\s*[*#]+\s+/gm, "")
    .trim();
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;

  const parsed: ChatMessage[] = [];
  for (const item of messages.slice(-MAX_HISTORY)) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim().length === 0) return null;
    parsed.push({ role, content: content.slice(0, MAX_CONTENT_LENGTH) });
  }
  return parsed;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed JSON body." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return Response.json(
      { error: "Body must be { messages: { role: 'user' | 'assistant', content: string }[] }." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Degrade gracefully: 200 with a polite bilingual fallback instead of a 500.
    return Response.json({ reply: FALLBACK_REPLY });
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const reply = sanitizeReply(raw);
    return Response.json({ reply: reply || FALLBACK_REPLY });
  } catch {
    return Response.json({ reply: FALLBACK_REPLY });
  }
}
