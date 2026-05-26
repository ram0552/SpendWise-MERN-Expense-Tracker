import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-100">
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Navbar />

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;