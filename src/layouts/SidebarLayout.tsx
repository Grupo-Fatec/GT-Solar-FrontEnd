import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { menuItems } from "./routes/SidebarRoutes";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#2B5337] text-white flex items-center justify-between px-4 py-3 z-50">
        <span className="text-xl font-semibold">GT Solar</span>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 w-64 bg-[#2B5337] text-white transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          md:translate-x-0 md:relative md:flex md:flex-col md:w-56
        `}
      >
        <div className="p-4 text-xl font-semibold hidden md:flex">GT Solar</div>
        <nav className="flex flex-col justify-between h-full px-4 pb-8">
          <ul className="space-y-2 mt-20 md:mt-0">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors text-white w-full mt-10">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto mt-14 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;