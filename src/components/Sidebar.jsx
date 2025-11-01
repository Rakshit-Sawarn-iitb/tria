import { useState, useMemo } from "react";
import { Users, Star, Ban, Search, Menu, X } from "lucide-react";

function Sidebar({
  activeView,
  setActiveView,
  contacts,
  searchTerm,
  setSearchTerm,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: contacts.length,
      favourites: contacts.filter((c) => c.favourite).length,
      blocked: contacts.filter((c) => c.blocked).length,
    }),
    [contacts]
  );

  const views = [
    { name: "All Contacts", icon: <Users size={18} />, count: counts.all },
    { name: "Favorites", icon: <Star size={18} />, count: counts.favourites },
    { name: "Blocked", icon: <Ban size={18} />, count: counts.blocked },
  ];

  return (
    <>
      <div className="md:hidden flex flex-col bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <img
              src="/fav.png"
              alt="logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-800">
              Pebble
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="hidden md:flex items-center gap-3 p-4 border-b border-gray-200">
          <img
            src="/fav.png"
            alt="logo"
            className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
          />
          <span className="text-xl lg:text-2xl font-semibold text-gray-800">
            Pebble
          </span>
        </div>

        <div className="hidden md:block px-4 pb-4 pt-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="px-4 text-gray-500 uppercase text-xs font-semibold mb-2">
          Views
        </div>
        <ul className="px-2">
          {views.map((view) => (
            <li
              key={view.name}
              className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer text-sm ${
                activeView === view.name
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveView(view.name);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                {view.icon}
                <span>{view.name}</span>
              </div>
              <span className="text-xs text-gray-500">{view.count}</span>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
