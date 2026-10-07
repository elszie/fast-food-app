import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/lib/CartContext";

const fallback = [
  { id: "1", name: "Hotsilog", description: "Garlic rice, egg, and savory BBQ pork.", price: 70, category: "Rice meals", image_url: "https://images.unsplash.com/photo-1606755962774-d026d4a68875?w=600&q=80" },
  { id: "2", name: "Beef Burger", description: "Classic beef patty with fresh lettuce.", price: 60, category: "Burgers", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
  { id: "3", name: "Double Cheese Burger", description: "Juicy beef patty with lettuce, tomato, and cheese.", price: 110, category: "Burgers", image_url: "https://images.unsplash.com/photo-1550547660-d94506f7d003?w=600&q=80" },
  { id: "4", name: "Crispy Fries", description: "Golden, salted, and crispy.", price: 45, category: "Fries", image_url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80" },
  { id: "5", name: "Calamansi Juice", description: "Freshly squeezed, refreshing.", price: 35, category: "Juices/Drinks", image_url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80" },
];

export default function Menu() {
  const { addItem } = useCart();
  const [items, setItems] = useState(fallback);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    base44.entities.MenuItem.list("-created_date", 50)
      .then((data) => { if (data && data.length) setItems(data); })
      .catch(() => {});
  }, []);

  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const shown = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-extrabold text-[#2D2D2D] mb-6">Full menu</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === c ? "bg-[#E5A85B] text-white" : "bg-white text-[#2D2D2D] border border-black/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="h-44">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-[#2D2D2D]">{item.name}</h3>
              <p className="text-sm text-[#6B6B6B] mt-1 flex-1">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-[#2D2D2D]">₱ {item.price}</span>
                <button
                  onClick={() => addItem(item)}
                  className="inline-flex items-center gap-1 bg-[#E5A85B] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#d99a4a] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}