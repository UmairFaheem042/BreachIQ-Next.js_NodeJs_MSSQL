"use client";

import { privateNav } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavTabs = ({ mobile = false }) => {
  const pathname = usePathname();

  const handleCloseSidebar = () => {
    const checkbox = document.getElementById("mobile-nav-toggle");
    if (checkbox) checkbox.checked = false;
  };

  if (mobile) {
    return (
      <ul className="flex flex-col gap-2 text-sm uppercase font-semibold text-gray-800">
        {privateNav.map((item) => {
          const isActive = pathname.startsWith(item.url);
          return (
            <li key={item.id}>
              <Link
                href={item.url}
                className={`block w-full px-4 py-2 rounded-md ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={handleCloseSidebar}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  // Desktop nav tabs
  return (
    <ul className="hidden md:flex items-center gap-3 text-sm uppercase bg-gray-100 rounded-md text-gray-800 py-3 px-1 font-semibold">
      {privateNav.map((item) => {
        const isActive = pathname.startsWith(item.url);
        return (
          <li key={item.id}>
            <Link
              href={item.url}
              className={`px-6 py-2 rounded-md transition-colors ${
                isActive ? "bg-white" : "hover:bg-white"
              }`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavTabs;
