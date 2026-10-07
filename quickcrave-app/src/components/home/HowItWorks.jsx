import React from "react";

const steps = [
  { n: "1", title: "Pick your food", text: "Browse the menu and add what you like to the cart." },
  { n: "2", title: "Choose how you pay", text: "Cash on delivery, or send it by GCash or Maya and paste the reference." },
  { n: "3", title: "Follow your rider", text: "Watch the order move from the kitchen to out for delivery in My orders." },
];

export default function HowItWorks() {
  return (
    <section>
      <h2 className="text-xl font-bold text-[#2D2D2D] mb-5">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div key={s.n} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="w-10 h-10 rounded-full bg-[#E5A85B] text-white font-bold flex items-center justify-center mb-4">
              {s.n}
            </div>
            <h3 className="font-bold text-[#2D2D2D]">{s.title}</h3>
            <p className="text-sm text-[#6B6B6B] mt-1.5 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}