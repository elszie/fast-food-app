import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const fallback = ["Rice meals", "Juices/Drinks", "Burgers", "Fries"];

export default function Categories() {
  const navigate = useNavigate();
  const [cats, setCats] = useState(fallback);

  useEffect(() => {
    base44.entities?.Category?.list?.()
      .then((data) => { if (data && data.length) setCats(data.map((c) => c.name)); })
      .catch(() => {});
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold text-[#2D2D2D] mb-5">Browse by category</h2>
      <div className="flex flex-wrap gap-3">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => navigate("/menu")}
            className="px-5 py-2.5 rounded-full bg-white text-[#2D2D2D] text-sm font-semibold shadow-sm border border-black/5 hover:border-[#E5A85B] hover:text-[#E5A85B] transition-colors"
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}