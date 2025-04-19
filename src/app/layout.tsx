'use client';
import { Provider } from "react-redux";
import { store } from "../../store";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./LayoutWrapper";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Toaster position="top-center" reverseOrder={false} />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
