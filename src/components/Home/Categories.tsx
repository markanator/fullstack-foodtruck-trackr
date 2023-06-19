import Link from "next/link";
import React from "react";
import CategoryCard from "./CategoryCard";

function Categories() {
  return (
    <section className="border-b border-gray-200 py-20 dark:border-foreground dark:bg-background">
      <div className="container mx-auto p-5 lg:p-0">
        <div className="mb-12 flex flex-col flex-wrap items-center justify-between text-center lg:flex-row lg:text-left">
          <div className="mb-4 lg:mb-0">
            <h1
              className="mb-2 text-2xl font-medium capitalize dark:text-gray-100 lg:text-3xl"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Explore by categories
            </h1>
            <p
              className="text-sm font-normal text-gray-500 dark:text-gray-400 lg:text-base"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              A selection of listing verified for quality
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="800">
            <Link
              href="#trucks"
              className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-400"
            >
              Explore More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="ml-3 h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    </section>
  );
}

export default Categories;
