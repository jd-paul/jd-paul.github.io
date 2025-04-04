import "./globals.css";
import type { Metadata } from "next";
import ThemeWrapper from "./theme-wrapper";

export const metadata: Metadata = {
  title: "Paul – Portfolio",
  description: "Retro Windows 95 style portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
