'use client';
import { Provider } from "react-redux";
import { store } from "../../store";
import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
