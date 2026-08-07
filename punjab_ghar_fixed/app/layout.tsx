import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Punjab Ghar Toolkit | ₹99",
  description: "Mistakes PDF, printable checklist and grey structure calculator for Punjab house construction planning."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="footer">
          <p>&copy; 2026 Punjab Ghar Toolkit. All rights reserved.</p>
          <p>Made with love by The.Ravi.Saini</p>
          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy-policy">Privacy</a>
            <a href="/refund-policy">Refund Policy</a>
            <a href="/contact">Contact</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
