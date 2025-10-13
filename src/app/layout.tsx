import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AWS Exam Practice - Cloud Practitioner Certification",
  description: "Master the AWS Cloud Practitioner certification exam with comprehensive practice questions, progress tracking, and detailed explanations.",
  keywords: ["AWS", "Cloud Practitioner", "certification", "exam practice", "AWS training"],
  authors: [{ name: "AWS Exam Practice" }],
  creator: "AWS Exam Practice",
  publisher: "AWS Exam Practice",
  robots: "index, follow",
  openGraph: {
    title: "AWS Exam Practice - Cloud Practitioner Certification",
    description: "Master the AWS Cloud Practitioner certification exam with comprehensive practice questions, progress tracking, and detailed explanations.",
    type: "website",
    locale: "en_US",
    siteName: "AWS Exam Practice",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Exam Practice - Cloud Practitioner Certification",
    description: "Master the AWS Cloud Practitioner certification exam with comprehensive practice questions, progress tracking, and detailed explanations.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
