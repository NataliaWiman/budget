"use client";
import "@/styles/globals.scss";
import { Gabarito, Montserrat } from "next/font/google";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";
import Navigation from "@/components/Navigation";

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={gabarito.variable}>
        <div className="flex flex-col min-h-[100vh] bg-slate-100">
          <AuthContextProvider>{children}</AuthContextProvider>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
