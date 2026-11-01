import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070a14",
};

export const metadata: Metadata = {
  title: "Punjab Ghar Toolkit | ₹99 | As Seen on Instagram @the.ravi.saini",
  description:
    "Mistakes PDF, printable site checklist and grey structure cost calculator for Punjab house construction planning. Curated by The.Ravi.Saini.",
  keywords: [
    "Punjab ghar construction",
    "Punjab Ghar Toolkit",
    "Ravi Saini",
    "the.ravi.saini",
    "grey structure cost calculator",
    "punjab house mistakes guide",
    "house construction checklist punjab"
  ],
  openGraph: {
    title: "Punjab Ghar Toolkit | By Ravi Saini (@the.ravi.saini)",
    description:
      "Essential mistakes guide, site inspection checklist, and grey structure estimator for Punjab home builders. Practical guidance by Ravi Saini.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={inter.className}
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#070a14",
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(245, 158, 11, 0.08), transparent 60%)",
          color: "#f8fafc",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <div style={{ flex: 1 }}>{children}</div>

        <footer
          className="footer"
          style={{
            backgroundColor: "#04060c",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "48px 20px 80px",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Instagram Creator Profile Highlight */}
            <a
              href="https://instagram.com/the.ravi.saini"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "8px 18px",
                borderRadius: "9999px",
                color: "#f8fafc",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e1306c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Follow @the.ravi.saini on Instagram</span>
            </a>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              Curated with ❤️ by The.Ravi.Saini for Punjab home builders
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              &copy; 2026 Punjab Ghar Toolkit. All rights reserved.
            </p>

            {/* Required policy links */}
            <div
              className="footer-links"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "18px",
                marginTop: "10px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <a
                href="/terms"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "color 0.2s ease",
                }}
              >
                Terms
              </a>
              <a
                href="/privacy-policy"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "color 0.2s ease",
                }}
              >
                Privacy
              </a>
              <a
                href="/refund-policy"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "color 0.2s ease",
                }}
              >
                Refund Policy
              </a>
              <a
                href="/contact"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "13px",
                  transition: "color 0.2s ease",
                }}
              >
                Contact
              </a>
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "#475569",
                maxWidth: "600px",
                lineHeight: 1.5,
                margin: "10px 0 0",
              }}
            >
              Disclaimer: This website is not part of the Instagram or Meta platform. Punjab Ghar Toolkit provides educational and practical guidelines for residential house construction planning in Punjab.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
