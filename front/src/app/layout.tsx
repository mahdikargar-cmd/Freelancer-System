"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/Components/navbar/Navbar";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import { metadata } from './metadata'; // Import metadata here

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir={'rtl'}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased m-2`}>
        <Provider store={store}>
            <Navbar />
            {children}
        </Provider>
        </body>
        </html>
    );
}
