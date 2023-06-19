import React from "react";
import Categories from "~/components/Home/Categories";
import Hero from "~/components/Home/Hero";
import PricingTable from "~/components/Home/PricingTable";
import TrendingList from "~/components/Home/TrendingList";

import "~/styles/globals.css";

function Index() {
  return (
    <div className="relative">
      <Hero />
      <TrendingList />
      <Categories />
      <PricingTable />
    </div>
  );
}

export default Index;
