import type { Metadata } from "next";

import "./globals.css";
import { ToasterContext } from "@/context/ToasterContext";
import { AuthContext } from "@/context/AuthContext";





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
          
          {children}
         </AuthContext>
       
      </body>
    </html>
  );
}
