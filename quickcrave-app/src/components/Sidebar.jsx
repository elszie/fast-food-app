import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home as HomeIcon, UtensilsCrossed, ShoppingBag, Heart, MapPin, HelpCircle, User } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/orders", label: "My orders", icon: ShoppingBag },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/addresses", label: "Addresses", icon: MapPin },
  { to: "/help", label: "Help", icon: HelpCircle },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-[#F5E6CC] flex flex-col px-6 py-8 border-r border-black/5">
      <div className="px-2 mb-10">
        <span className="text-2xl font-extrabold tracking-tight text-[#2D2D2D]">QuickCrave</span>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? "bg-[#E5A85B] text-white" : "text-[#2D2D2D] hover:bg-black/5"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 pt-6 border-t border-black/10">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#C4C4C4] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-sm text-[#2D2D2D]">Guest</p>
            <p className="text-xs text-[#6B6B6B]">Sign in to order</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-2.5 rounded-full bg-white text-[#2D2D2D] text-sm font-semibold shadow-sm hover:bg-white/90 transition-colors"
        >
          Sign in
        </button>
      </div>
    </aside>
  );
}