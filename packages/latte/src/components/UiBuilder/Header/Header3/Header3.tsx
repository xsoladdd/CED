import React from "react";
import Logo from "../Logo";
import { IHeader } from "../types";

const Header3: React.FC<IHeader> = ({ title, links }) => {
  return (
    <>
      <header className="text-gray-600 body-font bg-theme-primary-light-dominant">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            {links &&
              links.map(({ name, path }, idx) => (
                <a className="mr-5 hover:text-gray-900" id={path} key={idx}>
                  {name}
                </a>
              ))}
          </nav>
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <Logo src="/dummy/logo.svg" />
            <span className="ml-3 text-xl">{title}</span>
          </a>
          <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Button
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header3;
