import React, { useState, useEffect } from "react";
import promeLogo from "../assets/prome-logo.png";
import briefcase from "../assets/briefcase.png";
import hero from "../assets/hero.png";
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useGetLocationsQuery } from "@/api/prosApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";

interface HeaderNavProps {
  showHero?: boolean;
}

const HeaderNav = ({ showHero = false }: HeaderNavProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  const displayName = user?.username || user?.email?.split("@")[0] || "User";
  const initial = (displayName[0] || "U").toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  // Fetch locations
  const { data: locations } = useGetLocationsQuery();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    if (openMenu) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const toggleMenu = () => setOpenMenu((v) => !v);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedLocation) params.append("location", selectedLocation);

    navigate(`/professionals?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
              <img src={briefcase} alt="" className="w-5 h-5" />
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
            {/* When NOT authenticated: show Sign Up / Log In */}
            {!isAuthenticated && (
              <>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
                <li>
                  <a href="/login">Log In</a>
                </li>
              </>
            )}

            {/* When authenticated: show user menu */}
            {isAuthenticated && (
              <li className="relative group">
                {/* User chip (avatar initial + name) */}
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  data-testid="user-chip"
                >
                  <p className="h-[38px] w-[38px] bg-blue-100 text-white rounded-full flex justify-center items-center">
                    {initial}
                  </p>
                  <span>{displayName}</span>
                </button>

                {/* Desktop dropdown: appears on hover; also opens on click */}
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg
                  hidden lg:group-hover:block ${userMenuOpen ? "lg:block" : ""}`}
                  role="menu"
                  aria-label="User menu"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 bg-blue-100 text-white hover:text-blue-100 rounded-md border-white"
                    data-testid="logout-desktop"
                  >
                    Log out
                  </button>
                </div>

                {/* Mobile: logout is always visible (no hover on touch) */}
                <div className="mt-2 w-full lg:hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 rounded-md border bg-white hover:bg-gray-50"
                    data-testid="logout-mobile"
                  >
                    Log out
                  </button>
                </div>
              </li>
            )}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border border-gray-100 w-full py-3 rounded-md lg:rounded-tl-md lg:rounded-bl-md lg:rounded-tr-none lg:rounded-br-none px-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
                  placeholder="What service do you need?"
                />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border border-gray-100 py-3 px-2 rounded-md lg:rounded-none w-full shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:shadow-lg transition-all bg-white"
                >
                  <option value="">All Locations</option>
                  {locations?.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-100 py-[13px] w-full mt-6 lg:mt-0 text-white rounded lg:rounded-none lg:rounded-tr-md lg:rounded-br-md hover:bg-blue-600 hover:shadow-lg transition-all shadow-md"
              >
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
