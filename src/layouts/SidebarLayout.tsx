import { Link, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { menuItems } from "./routes/SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="bg-[#2B5337] w-64 min-h-screen p-4 text-white">
        <div className="flex items-center gap-2 mb-8 text-xl font-semibold">
          <span>GT Solar</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-4 w-52">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4F8A6E] transition-colors text-white w-full">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      <section className="w-full">
        <Outlet />
      </section>
    </div>
  );
};

export default Sidebar;
