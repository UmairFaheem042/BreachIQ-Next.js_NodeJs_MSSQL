import { Play } from "lucide-react";
import { checkAuthStatus, handleLogout } from "@/lib/actions/auth";
import Link from "next/link";
import logo from "../../../public/logo_small.png";
import Image from "next/image";
import NavTabs from "./NavTabs";

const Header = async () => {
  const { isAuthenticated } = await checkAuthStatus();

  return (
    <header className="">
      <nav className="max-w-[1800px] mx-auto w-full flex flexBetween gap-2 px-6 h-[100px]">
        <Link href="/" className="flex flexCenter gap-2">
          <Image src={logo} height={30} width={30} alt="Logo" />
          <h1 className="text-lg font-semibold">BreachIQ</h1>
        </Link>
        {isAuthenticated && <NavTabs />}
        <div>
          {isAuthenticated ? (
            <form action={handleLogout}>
              <button
                className="btn rounded-md btn-neutral font-semibold  text-sm hover:text-[#f2dbc4] flex flexCenter gap-2 transition-all"
                type="submit"
              >
                <Play fill="true" className="size-3" />
                <span>LOG OUT</span>
              </button>
            </form>
          ) : (
            <Link href="/login">
              <button className="btn rounded-md btn-neutral font-semibold  text-sm hover:text-[#f2dbc4] flex flexCenter gap-2 transition-all">
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
