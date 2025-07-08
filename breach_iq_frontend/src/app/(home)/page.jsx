import Link from "next/link";
import React from "react";

const Home = () => {
  const user = true;
  return (
    <section className="flex-1 flex flex-col flexCenter text-center bg-gray-50">
      <div className="mx-auto px-4">
        <div className="mb-4">
          <span className="uppercase inline-block px-3 py-2 text-sm font-bold bg-[#EDDFD1] hover:bg-[#f2dbc4] cursor-pointer transition-all text-gray-900 rounded-md border border-[#f2dbc4]">
            Real Time Breach Tracking
          </span>
        </div>

        <h1 className="mt-6 text-7xl capitalize font-extrabold text-gray-900">
          Protect your digital identity <br /> with BreachIQ
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Monitor your email for security breaches and stay one step ahead of
          cyber threats — instant, reliable, and secure breach tracking.
        </p>

        <Link href={user ? "/dashboard" : "/login"}>
          <button className="mt-6 py-6  w-[200px] btn rounded-lg btn-neutral font-medium text-lg hover:text-[#f2dbc4] gap-2 transition-all uppercase">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
