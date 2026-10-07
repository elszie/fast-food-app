import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Favorite.list("-created_date", 50)
      .then((data) => setItems(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-[#2D2D2D] mb-6">Favorites</h1>
      {loading ? (
        <p className="text-[#6B6B6B]">Loading…</p>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Heart className="w-10 h-10 text-[#C4C4C4] mx-auto mb-3" />
          <p className="text-[#6B6B6B]">No favorites yet. Tap the heart on any item to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((f) => (
            <article key={f.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-40">
                <img src={f.image_url} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#2D2D2D]">{f.name}</h3>
                <p className="font-bold text-[#E5A85B] mt-1">₱ {f.price}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}