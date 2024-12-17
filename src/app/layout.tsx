import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToasterContext } from "@/context/ToasterContext";
import { AuthContext } from "@/context/AuthContext";
import { ActiveStatus } from "@/components/ActiveStatus";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Messager clone",
  description: "Messager clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <ToasterContext/>
         <AuthContext>
          {/* <ActiveStatus/> */}
          {children}
         </AuthContext>
       
      </body>
    </html>
  );
}
