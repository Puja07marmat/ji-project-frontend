
"use client"; 

import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/section/Header";
import Footer from "@/components/section/Footer";
import { Inter } from "next/font/google";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // 👈 get current route

  // 👇 List of routes where Footer should be hidden
  const hideFooterRoutes = ["/subscription"];

  const showFooter = !hideFooterRoutes.includes(pathname);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <Header />
            {children}
            {showFooter && <Footer />} {/* 👈 conditionally render Footer */}
            <Toaster />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

