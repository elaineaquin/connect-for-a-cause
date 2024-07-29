import NextTopLoader from "nextjs-toploader";
import { Poppins } from "next/font/google";
import AppProvider from "@/providers";
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Connect for a Cause",
  description: "Created by our awesome group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AppProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
