import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto_Slab({
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
          <main className="min-h-screen w-full bg-gradient-to-br from-cyan-100 to-cyan-100/30">
            {children}
          </main>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
