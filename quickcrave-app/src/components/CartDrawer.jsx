import React, { useState } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty, removeItem, clear } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cash");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  const checkout = async () => {
    if (!address.trim()) return;
    setPlacing(true);
    try {
      await base44.entities.Order.create({
        items: items.map((i) => ({ name: i.name, price: i.price, qty: i.qty })),
        total,
        status: "pending",
        payment_method: payment,
        address,
      });
      clear();
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setOpen(false);
        navigate("/orders");
      }, 1200);
    } catch (e) {
      alert("Could not place order. Please sign in first.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed top-0 right-0 h-screen w-96 max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-black/5">
          <h2 className="font-bold text-lg text-[#2D2D2D]">Your cart</h2>
          <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-black/5">
            <X className="w-5 h-5 text-[#6B6B6B]" />
          </button>
        </div>

        {done ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <p className="font-bold text-[#2D2D2D]">Order placed!</p>
              <p className="text-sm text-[#6B6B6B] mt-1">Track it in My orders.</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-[#6B6B6B]">
            Your cart is empty. Add something from the menu!
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#2D2D2D]">{item.name}</p>
                    <p className="text-sm text-[#6B6B6B]">₱ {item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full bg-[#F5E6CC] flex items-center justify-center">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full bg-[#E5A85B] text-white flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-[#6B6B6B] hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/5 p-5 space-y-3">
              <div className="flex gap-2">
                {["cash", "gcash", "maya"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayment(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize ${
                      payment === m ? "bg-[#E5A85B] text-white" : "bg-[#F5E6CC] text-[#2D2D2D]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address"
                className="w-full px-3 py-2 rounded-xl border border-black/10 text-sm outline-none focus:border-[#E5A85B]"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B6B6B]">Total</span>
                <span className="font-bold text-lg text-[#2D2D2D]">₱ {total}</span>
              </div>
              <button
                onClick={checkout}
                disabled={placing || !address.trim()}
                className="w-full py-3 rounded-full bg-[#E5A85B] text-white font-semibold disabled:opacity-50 hover:bg-[#d99a4a] transition-colors"
              >
                {placing ? "Placing…" : "Place order"}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}