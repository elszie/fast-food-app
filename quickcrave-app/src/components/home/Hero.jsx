import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, MapPin } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#2D2D2D] leading-tight max-w-2xl">
        Hot rice meals, burgers and fries — delivered to your door.
      </h1>
      <p className="mt-4 text-[#6B6B6B] max-w-2xl leading-relaxed">
        Order in a few taps and pay your way: cash on delivery, GCash or Maya. We cook to order and
        keep you posted from the kitchen all the way to your gate.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          onClick={() => navigate("/menu")}
          className="inline-flex items-center gap-2 bg-[#E5A85B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d99a4a] transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Browse the menu
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="inline-flex items-center gap-2 bg-[#F5E6CC] text-[#2D2D2D] px-6 py-3 rounded-full font-semibold hover:bg-[#efdcc0] transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Track my order
        </button>
      </div>
    </section>
  );
}