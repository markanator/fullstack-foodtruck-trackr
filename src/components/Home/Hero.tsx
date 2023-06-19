/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <>
      <header
        style={{
          backgroundImage: "url('/img/bg-header-9.png')",
          backgroundSize: "100% 100%",
        }}
        className="sticky-header-first-content h-full max-h-[768px] dark:bg-foreground"
      >
        {/* HERO CONTENT */}
        <div className="container mx-auto grid grid-cols-12 items-center py-[50px]">
          <div className="relative col-span-12 mt-10 text-center lg:col-span-7 lg:mt-0 lg:h-[264px] lg:text-start">
            <h1 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white lg:text-5xl">
              Find Nearby <span className="text-blue-500">Food Trucks</span>
            </h1>
            <p className="block pb-10 text-sm text-gray-400 dark:text-gray-300 lg:pb-16 lg:text-lg">
              Find some of the best joints from around the city from our
              partners and friends.
            </p>
            {/* <!-- header-search  --> */}
            <div className="shadow-search-bar absolute bottom-[40px] left-0 z-[1] mb-6 hidden overflow-hidden rounded-full bg-white py-3 text-gray-900 dark:bg-background lg:inline-flex">
              <input
                type="text"
                className="border-r border-gray-200 py-2 pl-7 pr-4 focus:outline-none dark:bg-background dark:text-gray-100 dark:placeholder:text-gray-100"
                placeholder="What are you looking for ?"
              />
              <select
                name="cars"
                id="select-4"
                className="mr-4 py-2 pl-4 pr-20 text-gray-400 focus:outline-none dark:bg-background dark:text-gray-100"
              >
                <option value="volvo">Location</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <select
                name="cars"
                id="select-7"
                className="mr-4 border-l border-gray-200 py-2 pl-4 pr-20 text-gray-400 focus:outline-none dark:bg-background dark:text-gray-100"
              >
                <option value="volvo">Category</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
              <button
                type="button"
                className="mr-3 rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <Image
              className="w-full"
              src="/img/restaurant-foods.png"
              alt=""
              width={557}
              height={686}
            />
          </div>
        </div>
      </header>
      {/* Mobile inputs */}
      <div className="dark:bg-background">
        <div className="container mx-auto block px-5 pt-9 lg:hidden lg:px-0">
          <input
            type="text"
            className="mb-4 w-full rounded-full border border-gray-200 px-4 py-2 focus:outline-none dark:border-gray-800 dark:bg-foreground dark:text-white"
            placeholder="What are you looking for ?"
          />
          <select
            name="cars"
            id="select-8"
            className="mb-4 w-full rounded-full border border-gray-200 px-4 py-2 text-gray-400 focus:outline-none dark:border-gray-800 dark:bg-foreground dark:text-white"
          >
            <option value="volvo">Location</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <select
            name="cars"
            id="select-9"
            className="mb-4 w-full rounded-full border border-gray-200 px-4 py-2 text-gray-400 focus:outline-none dark:border-gray-800 dark:bg-foreground dark:text-white"
          >
            <option value="volvo">Category</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <button
            type="button"
            className="mb-4 w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
