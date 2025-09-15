import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </Link>
        
      </nav>
    </header>
  );
};

export default Navbar;
