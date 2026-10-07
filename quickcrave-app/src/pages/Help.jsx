import React from "react";
import { HelpCircle, MessageCircle, Phone } from "lucide-react";

const faqs = [
  { q: "How long does delivery take?", a: "Most orders arrive within 30–45 minutes depending on your location." },
  { q: "What payment methods do you accept?", a: "Cash on delivery, GCash, and Maya." },
  { q: "Can I cancel my order?", a: "You can cancel before the kitchen starts preparing it — usually within 2 minutes." },
];

export default function Help() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-[#2D2D2D] mb-6">Help</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-6 h-6 text-[#E5A85B]" />
          <h2 className="font-bold text-[#2D2D2D]">Frequently asked</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-black/5 last:border-0 pb-4 last:pb-0">
              <p className="font-semibold text-[#2D2D2D]">{f.q}</p>
              <p className="text-sm text-[#6B6B6B] mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white shadow-sm rounded-2xl py-3 font-semibold text-[#2D2D2D] hover:bg-black/5">
          <MessageCircle className="w-4 h-4" /> Chat with us
        </button>
        <button className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E5A85B] text-white rounded-2xl py-3 font-semibold hover:bg-[#d99a4a]">
          <Phone className="w-4 h-4" /> Call
        </button>
      </div>
    </div>
  );
}