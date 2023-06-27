import React from "react";
import SearchFiltersForm from "~/components/TrucksSearch/SearchFiltersForm";

type Props = {};

function TrucksPage({}: Props) {
  return (
    <div className="flex h-full w-full flex-nowrap">
      <div className="flex w-1/3 flex-col bg-gray-400/10">
        <SearchFiltersForm />
      </div>
      <div className="flex w-1/3 flex-col bg-red-500/10">COL 2</div>
      <div className="flex w-1/3 flex-col bg-green-500/10">COL 3</div>
    </div>
  );
}

export default TrucksPage;
