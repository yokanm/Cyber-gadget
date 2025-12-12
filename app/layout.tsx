import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/constants";
import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Better font loading
});

export const metadata: Metadata = {
  title: "Cyber - Your Electronics Store",
  description: "Shop the latest electronics and gadgets at competitive prices",
  keywords: ["electronics", "gadgets", "online store"],
  authors: [{ name: "Cyber Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter antialiased min-h-screen flex flex-col">
        <StoreProvider>
          <Navbar />
          <Breadcrumb />
          <main>
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}