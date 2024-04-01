import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BottomNav from "./components/BottomNav";
import MapboxMap from "./components/Map";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MapboxMap />
        <BottomNav />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
