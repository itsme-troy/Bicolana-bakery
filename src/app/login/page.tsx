import LoginForm from "@/components/LoginForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Login • Bicolana’s Bakery",
};
export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content */}
      <main className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-neutral-900">
            Login
          </h1>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder:text-neutral-500 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-orange-600 py-2 font-medium text-white hover:bg-orange-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-neutral-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-orange-600 hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
