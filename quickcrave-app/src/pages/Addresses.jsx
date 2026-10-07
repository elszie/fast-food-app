import React, { useEffect, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Address.list("-created_date", 50)
      .then((data) => setAddresses(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-[#2D2D2D]">Addresses</h1>
        <button className="inline-flex items-center gap-1 bg-[#E5A85B] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#d99a4a] transition-colors">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {loading ? (
        <p className="text-[#6B6B6B]">Loading…</p>
      ) : addresses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <MapPin className="w-10 h-10 text-[#C4C4C4] mx-auto mb-3" />
          <p className="text-[#6B6B6B]">No saved addresses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow-sm p-5">
              <p className="font-bold text-[#2D2D2D]">{a.label || "Address"}</p>
              <p className="text-sm text-[#6B6B6B] mt-1">{a.line}{a.city ? `, ${a.city}` : ""}</p>
              {a.phone && <p className="text-sm text-[#6B6B6B] mt-1">{a.phone}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}