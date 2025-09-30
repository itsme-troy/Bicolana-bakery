import Footer from "@/components/Footer";
import RegisterForm from "@/components/RegisterForm";

export const metadata = { title: "Create Account • Bicolana’s Bakery" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-neutral-900">
            Create Account
          </h1>
          <div className="mt-6">
            <RegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
