import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto_Mono({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "easeMyMeet",
  description:
    "One stop solution to fix and manage your professional and personal meetings.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.variable} antialiased text-blue-900`}>
          <Header />
          <main className="min-h-screen w-full container mx-auto bg-gradient-to-br from-cyan-100 to-cyan-100/30 pb-20">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
