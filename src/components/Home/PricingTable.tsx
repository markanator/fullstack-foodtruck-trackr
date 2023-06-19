import React from "react";

function PricingTable() {
  return (
    <section className="px-5 py-20 text-left dark:bg-background lg:px-0">
      <div
        className="container mx-auto"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h1 className="mb-4 text-3xl font-semibold dark:text-gray-100">
          Register your food truck with us
        </h1>
        <p className="mb-10 text-base font-normal text-gray-500 dark:text-gray-400">
          Start for free, upgrade when you need to.
        </p>
        <div className="mb-10 grid grid-cols-3 items-stretch gap-0">
          {/* FREE TIER */}
          <div className="group col-span-3 rounded-l bg-gray-50 opacity-75 dark:bg-foreground lg:col-span-1">
            <div className="my-14 border-transparent px-10 dark:border-r dark:border-gray-900 lg:border-r lg:border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-10 text-left text-6xl font-bold text-gray-700 dark:text-gray-300">
                    {/* <span className="text-base font-normal">$</span> */}
                    FREE
                    <span className="text-base font-normal"> /month </span>
                  </div>
                  <div className="text-left text-[22px] font-semibold dark:text-gray-400">
                    Early Stage Trucks
                  </div>
                  <div className="mb-10 text-left text-base font-normal text-gray-700 dark:text-gray-500">
                    Best for those just starting out.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="my-5 cursor-pointer rounded border border-gray-300 px-10 py-3 text-center text-sm font-medium tracking-wider text-gray-700 group-hover:bg-blue-500 group-hover:text-white dark:border-gray-700 dark:text-gray-300"
              >
                Add Listing
              </button>
              <ul>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Basic Truck Listing
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Basic Menu Options
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Limited Support
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* MID TIER */}
          <div className="group col-span-3 rounded-l bg-gray-50 opacity-75 dark:border-r dark:border-gray-900 dark:bg-foreground lg:col-span-1">
            <div className="my-14 border-transparent px-10 lg:border-r lg:border-gray-200">
              <div className="flex justify-between">
                <div>
                  <div className="mb-10 text-left text-6xl font-bold text-gray-700 dark:text-gray-300">
                    <span className="text-base font-normal">$</span> 99
                    <span className="text-base font-normal"> /month </span>
                  </div>
                  <div className="text-left text-[22px] font-semibold dark:text-gray-400">
                    High Growth Trucks
                  </div>
                  <div className="mb-10 text-left text-base font-normal text-gray-700 dark:text-gray-500">
                    Best choice for high growth food trucks.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="my-5 cursor-pointer rounded border border-gray-300 px-10 py-3 text-center text-sm font-medium tracking-wider text-gray-700 group-hover:bg-blue-500 group-hover:text-white dark:border-gray-700 dark:text-gray-300"
              >
                Add Listing
              </button>
              <ul>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      1 Premium Truck Listing.
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Better Menu Options
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      24/7 customer supports
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* ULTIMATE TIER */}
          <div className="col-span-3 scale-100 rounded-l bg-white shadow-xl dark:bg-foreground lg:col-span-1 lg:scale-110">
            <div className="my-14 px-10">
              <div className="text-center">
                <div className="mb-5 inline-flex items-center justify-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-2 h-3 w-3"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Most Popular
                </div>
              </div>
              <div className="text-left text-[22px] font-semibold dark:text-gray-400">
                Trucks w/ Brick &amp; Mortar
              </div>
              <div className="mb-10 text-left text-base font-normal text-gray-700 dark:text-gray-500">
                Explore our premium offerings for large businesses.
              </div>
              <div className="mb-10 text-left text-6xl font-bold text-gray-700 dark:text-gray-300">
                <span className="text-base font-normal">$</span> 199
                <span className="text-base font-normal">/month</span>
              </div>
              <button
                type="button"
                className="my-5 cursor-pointer rounded border border-blue-500 bg-blue-500 px-10 py-3 text-center text-sm font-medium tracking-wider text-white"
              >
                Add Listing
              </button>
              <ul>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      2 Premium Listings!
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Premium Menu Options
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      Exclusive Site Marketing Opportunities
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-4 flex items-center text-left">
                    <svg
                      className="mr-2 h-4 w-4 shrink-0 fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="flex-1 text-base font-normal text-gray-700 dark:text-gray-300">
                      24/7 Priority Customer Support
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingTable;
