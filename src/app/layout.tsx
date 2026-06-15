import type { Metadata } from "next";
import { Shell } from "@/components/layout/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "KlaraMD EyeCare",
  description: "Virtual eye-care workflows for patient assessment, booking, and provider review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
