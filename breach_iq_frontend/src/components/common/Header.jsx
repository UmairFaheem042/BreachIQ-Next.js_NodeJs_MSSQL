import { Play } from "lucide-react";
import { checkAuthStatus, handleLogout } from "@/lib/actions/auth";
import Link from "next/link";
import logo from "../../../public/logo_small.png";
import Image from "next/image";
import NavTabs from "./NavTabs";

const Header = async () => {
  const { isAuthenticated } = await checkAuthStatus();

  return (
    <header className="w-full">
      {/* Mobile Sidebar Toggle */}
      <input type="checkbox" id="mobile-nav-toggle" className="hidden peer" />
      <label
        htmlFor="mobile-nav-toggle"
        className="md:hidden absolute top-6 right-6 z-50 cursor-pointer"
      >
        <svg
          className="w-6 h-6 text-neutral-800"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      {/* Overlay when sidebar is open */}
      <label
        htmlFor="mobile-nav-toggle"
        className="hidden peer-checked:block fixed inset-0 bg-black/40 z-40 cursor-pointer"
      ></label>

      {/* Sidebar drawer */}
      <aside className="fixed top-0 right-0 w-64 h-full bg-base-100 z-50 translate-x-full peer-checked:translate-x-0 transition-transform duration-300 shadow-lg p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <label htmlFor="mobile-nav-toggle" className="text-xl cursor-pointer">✕</label>
        </div>

        {isAuthenticated && (
          <div className="flex flex-col gap-4">
            <NavTabs mobile />
          </div>
        )}

        <div className="mt-auto">
          {isAuthenticated ? (
            <form action={handleLogout}>
              <button
                className="btn w-full btn-neutral font-semibold text-sm hover:text-[#f2dbc4] flex flexCenter gap-2"
                type="submit"
              >
                <Play fill="true" className="size-3" />
                <span>LOG OUT</span>
              </button>
            </form>
          ) : (
            <Link href="/login">
              <button className="btn w-full btn-neutral font-semibold text-sm hover:text-[#f2dbc4] flex flexCenter gap-2">
                <Play fill="true" className="size-3" />
                <span>GET STARTED</span>
              </button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Nav Bar */}
      <nav className="max-w-[1600px] mx-auto w-full flex items-center justify-between px-6 h-[100px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} height={30} width={30} alt="Logo" />
          <h1 className="text-lg font-semibold">BreachIQ</h1>
        </Link>

        {/* Nav Items Center - only show on desktop */}
        {isAuthenticated && (
          <div className="hidden md:flex flex-1 justify-center">
            <NavTabs />
          </div>
        )}

        {/* Auth button right */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <form action={handleLogout}>
              <button
                className="btn btn-neutral rounded-md font-semibold text-sm hover:text-[#f2dbc4] flex items-center gap-2"
                type="submit"
              >
                <Play fill="true" className="size-3" />
                <span>LOG OUT</span>
              </button>
            </form>
          ) : (
            <Link href="/login">
              <button className="btn btn-neutral rounded-md font-semibold text-sm hover:text-[#f2dbc4] flex items-center gap-2">
                <Play fill="true" className="size-3" />
                <span>GET STARTED</span>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
