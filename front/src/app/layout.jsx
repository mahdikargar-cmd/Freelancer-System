"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../Components/navbar/Navbar";
import {AuthProvider} from "./context/AuthContext";

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

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir={'rtl'}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased m-2`}>
        <AuthProvider>
            <Navbar />
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
