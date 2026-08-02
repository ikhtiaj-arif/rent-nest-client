import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rent Nest",
  description: "Created by Ikhtiaj Arif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className="scroll-smooth"
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground dark">
        <Toaster
          position="top-right" richColors />
        {children}</body>
    </html>
  );
}
