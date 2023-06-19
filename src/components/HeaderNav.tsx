import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function HeaderNav() {
  const handleLogin = async () => {
    await signIn();
  };

  return (
    <div className="navbar hero-sticky-header -top-20 flex h-20 w-full items-center">
      <nav className="container mx-auto flex items-center justify-between px-5 transition-all lg:px-0">
        <button type="button" className="menu-btn block lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link href="/" className="flex items-center">
          <img className="mr-3 h-11 w-11" src="img/logo.svg" alt="" />
          <h6 className="block text-base font-medium md:hidden">
            Food Truck TrackR
          </h6>
        </Link>
        <div className="hidden items-center lg:flex">
          <ul className="flex items-center">
            <li className="list-none pr-9">
              <Link
                href="/"
                className="link relative flex items-center hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li className="list-none pr-9">
              <Link
                href="/trucks"
                className="link relative flex items-center hover:text-blue-500"
              >
                Search Trucks
              </Link>
            </li>
            <li className="list-none pr-9">
              <Button onClick={handleLogin}>Login</Button>
            </li>
            {/* DARK MODE TOGGLE */}
            {/* <li className="mr-9">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="darkMode h-5 w-5 cursor-pointer text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="lightMode hidden h-5 w-5 cursor-pointer text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li> */}
          </ul>
          {/* ADD LISTING */}
          {/* <Button type="button" variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-0 h-4 w-4 xl:mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <span className="hidden xl:block">Add Listing</span>
              </Button> */}
        </div>
      </nav>
    </div>
  );
}

export default HeaderNav;
