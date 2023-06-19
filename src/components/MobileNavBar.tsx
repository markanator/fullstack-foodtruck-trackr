import React from "react";
import { Button } from "./ui/button";

function MobileNavBar() {
  return (
    <div className="mobile-navbar fixed -left-full top-0 z-[100] h-full w-full overflow-y-auto bg-white transition-all dark:bg-background">
      {/* HAMBURGER */}
      <div className="flex justify-end py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="close-navbar-btn mr-4 h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <ul className="mx-5">
        <li className="">
          <div className="dropdown dropdown-mobile rounded-lg dark:bg-foreground">
            <Button variant="link">Home</Button>
          </div>
        </li>
        <li className="">
          <div
            className="dropdown dropdown-mobile rounded-lg dark:bg-foreground"
            data-dropdown
          >
            <Button
              // className="link flex w-full items-center justify-between border-b border-gray-200 py-3 pb-5 font-normal text-gray-500 dark:border-gray-800 dark:text-gray-200"
              data-dropdown-button
            >
              {" "}
              Pages{" "}
              <svg
                className="ml-2 h-auto w-3 transition-all"
                width="10"
                height="6"
                data-dropdown-button
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.99982 6.00001C4.79513 6.00001 4.59034 5.92467 4.43435 5.774L0.434558 1.91686C0.122074 1.61552 0.122074 1.12735 0.434558 0.826011C0.747042 0.524671 1.25327 0.524671 1.56575 0.826011L4.99982 4.13893L8.43464 0.826613C8.74712 0.525274 9.25335 0.525274 9.56583 0.826613C9.87831 1.12795 9.87831 1.61612 9.56583 1.91746L5.56604 5.7746C5.4098 5.92527 5.20481 6.00001 4.99982 6.00001Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <div className="dropdown-mobile-menu text-gray-700 dark:bg-foreground dark:text-gray-300">
              <div className="flex max-w-full flex-wrap">
                <div className="flex-shrink-0 p-4">
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-semibold">Landing Page</h5>
                    <a
                      href="landing-page-1.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Area Listing page Area Listing page Area Listing page
                      landing Page One Area Listing page
                    </a>
                    <a
                      href="landing-page-2.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Property listing{" "}
                    </a>
                    <a
                      href="landing-page-3.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Apartment listing{" "}
                    </a>
                    <a
                      href="landing-page-4.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Hotel listing{" "}
                    </a>
                    <a
                      href="landing-page-5.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Shop listing{" "}
                    </a>
                    <a
                      href="landing-page-6.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Retaurent listing{" "}
                    </a>
                    <a
                      href="landing-page-7.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Event listing{" "}
                    </a>
                  </div>
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 w-32 truncate text-sm font-semibold">
                      Agent
                    </h5>
                    <a
                      href="agent-profile.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Agent Profile
                    </a>
                    <a
                      href="agent-list.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Agent List
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-medium">Blog</h5>
                    <a
                      href="blog-details-page.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Blog Details
                    </a>
                    <a
                      href="blog-list-page.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Blog List{" "}
                    </a>
                  </div>
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-medium">Pricing</h5>
                    <a
                      href="pricing-page-1.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Pricing Page One
                    </a>
                    <a
                      href="pricing-page-2.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Pricing Page Two
                    </a>
                  </div>
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-medium">Event</h5>
                    <a
                      href="event-listing-details-page.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Event Listing Page
                    </a>
                    <a
                      href="apartment-details-page.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Apartment Details Page
                    </a>
                    <a
                      href="resturant-details-page.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Restaurent Details Page{" "}
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-medium">Listing</h5>
                    <a
                      href="listing-list.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Listing Filter
                    </a>
                    <a
                      href="listing-grid.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Listing Grid{" "}
                    </a>
                    <a
                      href="listing-map-grid-view.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Listing Map Grid View{" "}
                    </a>
                    <a
                      href="listing-map-list-view.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Listing Map List View{" "}
                    </a>
                    <a
                      href="listing-map-half-grid-view.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Listing Map Half Grid View{" "}
                    </a>
                  </div>
                  <div className="mb-7 flex flex-col">
                    <h5 className="mb-2 text-sm font-medium">Others</h5>
                    <a
                      href="bookin-page.html"
                      className="link mb-2 w-32 truncate text-sm font-normal hover:text-blue-500"
                    >
                      Booking Page
                    </a>
                    <a
                      href="contact-page.html"
                      className="link mb-0 w-32 truncate text-sm hover:text-blue-500"
                    >
                      Contact Page{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="">
          <div
            className="dropdown dropdown-mobile rounded-lg dark:bg-foreground"
            data-dropdown
          >
            <button
              className="link flex w-full items-center justify-between border-b border-gray-200 py-3 pb-5 font-normal text-gray-500 dark:border-gray-800 dark:text-gray-200"
              data-dropdown-button
            >
              {" "}
              Dashboard{" "}
              <svg
                className="ml-2 h-auto w-3 transition-all"
                width="10"
                height="6"
                data-dropdown-button
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.99982 6.00001C4.79513 6.00001 4.59034 5.92467 4.43435 5.774L0.434558 1.91686C0.122074 1.61552 0.122074 1.12735 0.434558 0.826011C0.747042 0.524671 1.25327 0.524671 1.56575 0.826011L4.99982 4.13893L8.43464 0.826613C8.74712 0.525274 9.25335 0.525274 9.56583 0.826613C9.87831 1.12795 9.87831 1.61612 9.56583 1.91746L5.56604 5.7746C5.4098 5.92527 5.20481 6.00001 4.99982 6.00001Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div className="dropdown-mobile-menu text-gray-700 dark:bg-foreground dark:text-gray-300">
              <div className="dropdown-links">
                <ul className="p-4">
                  <li className="">
                    <a
                      href="dashboard-home.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      {" "}
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-addlisting.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Add Listing One
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-addlisting-2.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Add Listing Two
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-booking.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Booking
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-bookmarks.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Bookmarks
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-bookmarks.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Messages
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-mylisting.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Mylisting
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-myprofile.html"
                      className="block pb-3 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="dashboard-reviews.html"
                      className="block pb-0 text-sm hover:text-blue-500 dark:hover:text-blue-500"
                    >
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default MobileNavBar;
