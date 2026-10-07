import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/lib/CartContext";

const fallback = [
  {
    id: "1",
    name: "Hotsilog",
    description: "Garlic rice, egg, and savory BBQ pork.",
    price: 70,
    badge: "Popular",
    image_url: "https://images.unsplash.com/photo-1606755962774-d026d4a68875?w=600&q=80",
  },
  {
    id: "2",
    name: "Beef Burger",
    description: "Classic beef patty with fresh lettuce.",
    price: 60,
    badge: "Bestseller",
    image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    id: "3",
    name: "Double Cheese Burger",
    description: "Juicy beef patty with lettuce, tomato, and cheese.",
    price: 110,
    badge: "Popular",
    image_url: "https://images.unsplash.com/photo-1550547660-d94506f7d003?w=600&q=80",
  },
];

export default function PopularItems() {
  const { addItem } = useCart();
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    base44.entities.MenuItem
      .filter({ is_popular: true }, "-created_date", 3)
      .then((data) => { if (data && data.length) setItems(data); })
      .catch(() => {});
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#2D2D2D]">Popular right now</h2>
        <Link to="/menu" className="text-sm font-semibold text-[#E5A85B] hover:underline">
          See the full menu
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-44">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              {item.badge && (
                <span className="absolute top-3 left-3 bg-white/95 text-[#6B6B6B] text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white">
                <Heart className="w-4 h-4 text-[#6B6B6B]" />
              </button>
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
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}