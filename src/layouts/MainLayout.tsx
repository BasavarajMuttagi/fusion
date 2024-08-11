import { ReactNode } from "react";
import SideNav from "../components/SideNav";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="py-10 border-r">
        <SideNav />
      </div>
      <main
        className="shrink-0 flex-1 p-5 overflow-x-hidden overflow-y-scroll"
        style={{ scrollbarWidth: "thin" }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
