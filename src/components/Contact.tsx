"use client"; // client component, it uses hooks and browser interactions
import { useState } from "react"; // react hook to manage form state(input values, loading messages)

// reusable Tailwind class string for all inputs/textareas
// ensures inputs are dark text(text-neutral-900) with medium placeholder
//  (placeholder:text-neutral-500), and orange highlight on focus.
const inputBase =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 " +
  "text-neutral-900 placeholder:text-neutral-500 " +
  "outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";

// name, email, phone, message → store form input values.
// sending → true while submitting (to disable button + show "Sending...").
// status → success/error message shown below form.
// maxChars → limit for message field (500).
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(
    null
  );
  const maxChars = 500;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); // stops browser from reloading on form submit.
    setStatus(null);
    // Simple client-side validation → checks if required fields are empty.
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, msg: "Please fill out all required fields." });
      return;
    }
    try {
      // sends data to /api/contact (a Next.js API route)
      // payload includes from fields as JSON
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      // If server responds OK → show success message.
      // Reset all fields.
      if (!res.ok) throw new Error("Failed to send");
      setStatus({ ok: true, msg: "Message sent! We'll get back to you soon." });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      // If error → show error message.
      // Always stop sending after completion.
      setStatus({ ok: false, msg: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    // light gray background and vertical padding
    <section id="contact" className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
            Get in <span className="text-orange-700">Touch</span>
          </h2>
          <p className="mt-2 text-neutral-700">
            Have questions about our products or want to place a special order?
            We’d love to hear from you!
          </p>
        </div>
        {/* two column grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Left: info */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-semibold text-neutral-900">
              Visit Our Bakery
            </h3>
            <ul className="mt-6 space-y-5 text-neutral-800">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  📍
                </span>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-neutral-700">
                    Metro Manila, Philippines
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  📞
                </span>
                <div>
                  <div className="font-semibold">Phone</div>
                  <a
                    href="tel:09947216915"
                    className="font-medium text-orange-700 hover:underline"
                  >
                    0994 721 6915
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  ⏰
                </span>
                <div>
                  <div className="font-semibold">Hours</div>
                  <div className="text-neutral-700">
                    Mon–Sun: 5:00 AM – 8:00 PM
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  ✉️
                </span>
                <div>
                  <div className="font-semibold">Email</div>
                  <a
                    href="mailto:hello@bicobakery.com"
                    className="font-medium text-orange-700 hover:underline"
                  >
                    hello@bicobakery.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
          >
            <h3 className="text-xl font-semibold text-neutral-900">
              Send us a Message
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Name *
                </label>
                <input
                  type="text"
                  className={inputBase}
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Email *
                </label>
                <input
                  type="email"
                  className={inputBase}
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-800">
                Phone
              </label>
              <input
                type="tel"
                className={inputBase}
                placeholder="+63 917 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-800">
                Message *
              </label>
              <textarea
                className={inputBase + " h-32 resize-y"}
                placeholder="Tell us about your inquiry or special order..."
                maxLength={maxChars}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="mt-1 text-xs text-neutral-600">
                {message.length}/{maxChars} characters
              </div>
            </div>

            {status && (
              <div
                className={`mt-4 text-sm ${
                  status.ok ? "text-green-700" : "text-red-600"
                }`}
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700 disabled:opacity-60"
            >
              ✈️ {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
