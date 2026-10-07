import React from "react";
import { Outlet } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/lib/CartContext";

function CartButton() {
  const { count, setOpen } = useCart();
  if (count === 0) return null;
  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 bg-[#E5A85B] text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:bg-[#d99a4a] transition-colors"
    >
      <ShoppingBag className="w-5 h-5" />
      {count} · View cart
    </button>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto h-screen">
        <Outlet />
      </main>
      <CartButton />
      <CartDrawer />
    </div>
  );
}