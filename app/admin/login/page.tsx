import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "@/components/admin/login-form";
import { SetupScreen } from "@/components/admin/setup-screen";

export default function LoginPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	return (
		<div className="flex min-h-svh items-center justify-center bg-[#faf7fb] p-6">
			<LoginForm />
		</div>
	);
}
