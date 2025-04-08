import "~/styles/globals.css";

import { Poppins, Roboto } from "next/font/google";
import { type Metadata } from "next";
import { Providers } from "~/app/provider";
import { type ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";

const text = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const heading = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-text",
});

export const metadata: Metadata = {
  title: "Kolibri Business",
  description: "Kolibri Business Dashboard by Pam",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${text.variable}`}>
      <body className="grid">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
