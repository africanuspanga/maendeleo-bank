/**
 * Brand/social icons as inline SVGs — lucide-react no longer ships brand
 * marks (Facebook/Instagram/Twitter were removed), so these are the
 * official glyphs drawn as fill-based SVGs. `strokeWidth` is accepted (and
 * ignored) so they are drop-in compatible with Lucide usage.
 */
type IconProps = {
	className?: string;
	strokeWidth?: number;
	"aria-hidden"?: boolean | "true" | "false";
};

export function FacebookIcon({ className }: IconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden
			focusable="false"
		>
			<path d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.2c0-.81.22-1.36 1.39-1.36h1.48V5.35c-.26-.03-1.14-.11-2.16-.11-2.14 0-3.61 1.3-3.61 3.7V11H8.18v2.8h2.42V21h2.9Z" />
		</svg>
	);
}

export function InstagramIcon({ className }: IconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			className={className}
			aria-hidden
			focusable="false"
		>
			<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.8" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
		</svg>
	);
}

export function XIcon({ className }: IconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden
			focusable="false"
		>
			<path d="M17.2 4h2.6l-5.7 6.6L20.8 20h-5.3l-4.1-5.4L6.6 20H4l6.1-7L3.5 4H9l3.7 4.9L17.2 4Zm-.9 14.3h1.4L8 5.6H6.5l9.8 12.7Z" />
		</svg>
	);
}
