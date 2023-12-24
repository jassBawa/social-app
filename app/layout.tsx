import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

import Sidebar from "@/components/Sidebar/Sidebar";
import FollowBar from "@/components/FollowBar";
import CombinedModal from "@/components/modals/CombinedModal";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <SessionProvider session={session}> */}
        <Toaster />
        <CombinedModal />
        <div className="h-screen relative bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div
                className=" col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              h-full
              no-scrollbar
overflow-y-auto
              border-neutral-800"
              >
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
