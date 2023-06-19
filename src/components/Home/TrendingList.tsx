/* eslint-disable @next/next/no-img-element */
import React from "react";
import TrendingListItem from "./TrendingListItem";

function TrendingList() {
  return (
    <section className="border-b border-gray-200 py-20 dark:border-foreground dark:bg-background">
      <div className="container mx-auto">
        <div className="mb-[30px] flex flex-col flex-wrap items-center justify-between text-center lg:flex-row lg:text-left">
          <div className="mb-4 lg:mb-0" data-aos="fade-up">
            <h2 className="mb-2 text-2xl font-medium capitalize dark:text-gray-100 lg:text-3xl">
              Trending Listing
            </h2>
            <h6 className="text-sm font-normal text-gray-500 dark:text-gray-400 lg:text-base">
              A selection of listing verified for quality
            </h6>
          </div>
          <div data-aos="fade-up">
            <a
              href="listing-list.html"
              className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-400"
            >
              Explore More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="ml-3 h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          <TrendingListItem title="Furey of Strom-Artcel" />
          <TrendingListItem title="Furey of Strom-Artcel" />
          <TrendingListItem title="Furey of Strom-Artcel" />
          <TrendingListItem title="Furey of Strom-Artcel" />
          <TrendingListItem title="Furey of Strom-Artcel" />
          <TrendingListItem title="Furey of Strom-Artcel" />
        </div>
      </div>
    </section>
  );
}

export default TrendingList;
