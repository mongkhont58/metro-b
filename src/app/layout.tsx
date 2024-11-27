import type { Metadata } from "next";
import "./globals.css";
import NavigationBarHeader from "@/components/NavigationBarHeader";
import NavigateBarBottom from "@/components/NavigateBarBottom";
import localFont from 'next/font/local'
import SpeedDialNavigation from "@/components/SpeedDialNavigation";
import { apiURL } from "../constants";
import parse from 'html-react-parser'
import ClientModal from "@/components/ClientModal";
import Cookie from "@/components/Cookie";

const Sarabun = localFont({ src: '../../public/fonts/Sarabun-Regular.woff2' })

export const metadata: Metadata = {
  title: "สน.หลักสอง/ช่องทางการแจ้งเรื่องร้องเรียนการทุจริต",
  description: "ช่องทางการแจ้งเรื่องร้องเรียนการทุจริต",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const res = await fetch(apiURL + '/information', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    cache: 'no-store',
    body: JSON.stringify({
      type: '',
      id: ''
    })
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  return (
    <html lang="en">
      <head>
        {parse(data.data?.google?.analytics ?? '')}
      </head>
      <body
        className={`${Sarabun.className} antialiased flex flex-col min-h-screen`}
      >
        <ClientModal info={data} />
        <NavigationBarHeader info={data} />
        {children}
        <div className="fixed bottom-0">
          <Cookie />
        </div>
        <div className="fixed bottom-5 right-5">
          <SpeedDialNavigation info={data} />
        </div>
        <footer className="mt-auto">
          <NavigateBarBottom info={data} />
        </footer>
      </body>
    </html>
  );
}
