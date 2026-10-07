import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { base44 } from "@/api/base44Client";

const statusColor = {
  pending: "bg-amber-100 text-amber-700",
  preparing: "bg-blue-100 text-blue-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Order.list("-created_date", 20)
      .then((data) => setOrders(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-[#2D2D2D] mb-6">My orders</h1>
      {loading ? (
        <p className="text-[#6B6B6B]">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <ShoppingBag className="w-10 h-10 text-[#C4C4C4] mx-auto mb-3" />
          <p className="text-[#6B6B6B]">No orders yet. Browse the menu to place your first one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#2D2D2D]">₱ {o.total}</p>
                <p className="text-sm text-[#6B6B6B] capitalize">{o.payment_method} · {o.address}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor[o.status] || "bg-gray-100 text-gray-700"}`}>
                {o.status?.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}