import React from "react";
import SearchFiltersForm from "~/components/TrucksSearch/SearchFiltersForm";

type Props = {};

function TrucksPage({}: Props) {
  return (
    <div className="flex h-full w-full flex-nowrap">
      <div className="flex w-2/12 flex-col bg-gray-400/10">
        <SearchFiltersForm />
      </div>
      <div className="flex w-3/12 flex-col bg-red-500/10">
        Showing 3 trucks <br />
        TRUCK 1 <br />
        TRUCK 2 <br />
        TRUCK 3
      </div>
      <div className="flex w-7/12 flex-col bg-green-500/10">MAP</div>
    </div>
  );
}

export default TrucksPage;
