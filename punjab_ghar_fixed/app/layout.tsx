import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Punjab Ghar Toolkit | ₹99",
  description: "Mistakes PDF, printable checklist and grey structure calculator for Punjab house construction planning."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
