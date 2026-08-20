/**
 * One date formatting convention for the whole site (F20).
 * Financial data gets a time as well as a date.
 */

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "numeric",
	month: "long",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
});

/** "20 August 2026" */
export function formatDate(d: string | Date): string {
	return dateFormatter.format(new Date(d));
}

/** "20 August 2026, 14:35" */
export function formatDateTime(d: string | Date): string {
	return dateTimeFormatter.format(new Date(d));
}
