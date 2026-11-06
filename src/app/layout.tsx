import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { mergeClassNames } from "@/styles/class-names";
import "@/styles/globals.css";

const portalTypeface = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Корочки.есть",
  description: "Портал записи на образовательные курсы",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={mergeClassNames("font-sans", portalTypeface.variable)}>
      <body>{children}</body>
    </html>
  );
}
