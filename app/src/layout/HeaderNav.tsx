import React, { useState, useEffect } from "react";
import promeLogo from "../assets/prome-logo.png";
import briefcase from "../assets/briefcase.png";
import hero from "../assets/hero.png";
import { CiMenuBurger } from "react-icons/ci";

interface HeaderNavProps {
  showHero?: boolean;
}

const HeaderNav = ({ showHero = false }: HeaderNavProps) => {
  const [openMenu, setOpenMenu] = useState(true);

  // Close on Escape (mobile menu)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    if (openMenu) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const toggleMenu = () => setOpenMenu((v) => !v);

  return (
    <header className={showHero ? "h-screen bg-[#EEEEEE]" : "pb-20"}>
      <div className="fixed flex justify-between items-center py-3 lg:py-5 px-4 lg:px-25 lg:border-b border-[#2F2F2F4D] bg-white w-full z-200">
        <a href="/" className="inline-flex items-center gap-2">
          <img
            src={promeLogo}
            alt="Prome"
            className="w-[136px] h-auto"
            width={136}
            height={40}
          />
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          aria-expanded={openMenu}
          aria-label={openMenu ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <CiMenuBurger aria-hidden="true" className="h-7 w-7 text-black" />
        </button>
        <nav
          className={`${
            openMenu ? "hidden" : "block absolute left-0 top-17"
          }  w-full lg:static lg:block lg:w-auto bg-white`}
        >
          <ul className="flex flex-col lg:flex-row justify-center items-center py-10 lg:py-3 gap-6 lg:gap-12 text-lg text-black-100 font-normal">
            <li className="flex items-center gap-2">
              <img src={briefcase} alt="" className="w-5 h-5"/>
              <a
                href="/professionals"
                className="text-lg text-blue-100 font-normal"
              >
                Hire a pro
              </a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/login">Log In</a>
            </li>
            <li className="flex items-center gap-2">
              <p className="h-[38px] w-[38px] bg-blue-100 rounded-full flex justify-center items-center">D</p>
              <span>Demilade</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* hero section */}
      {showHero && (
        <section className="pt-26 lg:pt-36 px-4 flex flex-col lg:flex-row justify-center items-center gap-20">
          <div className="space-y-6">
            <span className="text-[22px] font-semibold text-blue-100 border-b-2">
              HIRE A PRO
            </span>
            <h1 className="text-[28px] font-extrabold leading-9 pt-3">
              Find local professionals for any home project
            </h1>
            <div className="lg:grid lg:grid-cols-[80%_auto] lg:items-start">
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-[80%_auto] w-full">
                <input
                  type="text"
                  name=""
                  id=""
                  className="border border-gray-100 w-full py-3 rounded-md lg:rounded-tl-md lg:rounded-bl-md lg:rounded-tr-none lg:rounded-br-none px-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
                  placeholder="What service do you need?"
                />
                <select
                  name=""
                  id=""
                  className="border border-gray-100 py-3 px-2 rounded-md lg:rounded-none w-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
                >
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                </select>
              </div>
              <button className="bg-blue-100 py-[13px] w-full mt-6 lg:mt-0 text-white rounded lg:rounded-none lg:rounded-tr-md lg:rounded-br-md hover:bg-blue-600 hover:shadow-lg transition-all shadow-md">
                Get Started
              </button>
            </div>
          </div>
          <img
            src={hero}
            alt="Hero image"
            className="w-auto h-[70vh] hidden lg:block object-cover"
          />
        </section>
      )}
    </header>
  );
};

export default HeaderNav;
