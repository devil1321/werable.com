import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'animate.css'
import Nav from "./components/global/nav.component";
import Footer from "./components/global/footer.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
