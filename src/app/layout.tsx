import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Bicolana’s Bakery",
  description: "Authentic Filipino baked goods made with love and tradition.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-neutral-50 text-neutral-900`}>
        <main className="mx-auto border">{children}</main>
      </body>
    </html>
  );
}
