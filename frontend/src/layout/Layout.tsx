import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className=" flex flex-col bg-white font-sans overflow-x-hidden scroll-smooth">
      <div className="fixed top-0 left-0 w-full h-1 bg-brand z-50 animate-load" />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;