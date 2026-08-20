import { redirect } from "next/navigation";

// DEMO MODE: no auth — /admin/login just forwards to the dashboard.
export default function LoginPage() {
	redirect("/admin");
}
