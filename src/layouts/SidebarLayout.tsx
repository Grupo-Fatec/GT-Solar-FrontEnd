import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { menuItems } from "./routes/SidebarRoutes";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Topbar mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-[#2B5337] text-white flex items-center justify-between px-4 py-3 z-50">
        <span className="text-xl font-semibold">GT Solar</span>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <Menu size={28} />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 inset-y-0 left-0 w-56 bg-[#2B5337] text-white transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:relative md:flex md:flex-col
        `}
      >
        <div className="p-4 text-xl font-semibold hidden md:flex">GT Solar</div>
        <nav className="flex flex-col justify-between h-full px-4 pb-8 pt-16 md:pt-0">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors"
                  onClick={() => setIsOpen(false)} // fecha ao clicar no mobile
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/pages/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors text-white w-full mt-10"
            onClick={() => setIsOpen(false)}
          >
            <LogOut size={20} />
            <span>Sair</span>
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
