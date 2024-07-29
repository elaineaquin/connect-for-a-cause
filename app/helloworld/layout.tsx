import type { Metadata } from "next";

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
    <html>
      <body>{children}</body>
    </html>
  );
}
