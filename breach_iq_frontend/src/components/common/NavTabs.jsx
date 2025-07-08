"use client";

import { privateNav } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavTabs = () => {
  const pathname = usePathname();

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
