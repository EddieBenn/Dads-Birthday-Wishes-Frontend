"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className={`px-4 lg:px-[7rem] relative z-50 flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out`}>
      <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white transition-colors duration-300 ease-in-out">
        <Link href="/">The Ndaobong Family</Link>
      </h1>
        <ThemeToggle />
    </header>
  );
}
