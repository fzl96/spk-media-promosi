"use client";

import Link from "next/link";
import { Icons } from "./icons";

export default function Logo() {
  return (
    <div className="px-2 mb-10">
      <Link href="/" className="items-center flex space-x-2">
        <Icons.logo />
        <span className="font-bold ">Sispeku</span>
      </Link>
    </div>
  );
}
