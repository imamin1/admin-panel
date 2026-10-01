import { useEffect } from "react";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import { toggleSidebar } from "../../utils/initalDoms";
import Dashboard from "../../pages/dashboard/Dashboard";

const Index = () => {
  useEffect(() => {
    toggleSidebar()
  }, []);
  return (
    <div>
      <Navbar />
      <Sidebar />
      <section id="content_section" className="bg-light py-2 px-3">
        <Dashboard/>
      </section>
      
    </div>
  );
};

export default Index;
