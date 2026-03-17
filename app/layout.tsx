import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "@/components/ui/loading/LoadingProvider";
import Navbar from "@/components/ui/navbar/Navbar";
import Cursor from "@/components/ui/Cursor";
import CharacterCanvas from "@/components/CharacterCanvas";
import SocialIcons from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Hariom Patil — Portfolio",
  description: "Full Stack Developer & Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Cursor />

        <LoadingProvider>
          <CharacterCanvas />
          <SocialIcons /> 
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Navbar />
              {children}
            </div>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}