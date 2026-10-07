import React from "react";
import Hero from "@/components/home/Hero";
import PopularItems from "@/components/home/PopularItems";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div className="p-6 md:p-10 space-y-10 max-w-6xl mx-auto">
      <Hero />
      <PopularItems />
      <Categories />
      <HowItWorks />
    </div>
  );
}