import Navbar from "@/components/Navbar";
import OrgSidebar from "@/components/OrgSidebar";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="h-full ">
      <div className="flex gap-x-0 h-full">
        <OrgSidebar />
        <div className="h-full flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
}
