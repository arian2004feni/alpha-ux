import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "./auth/signInButton";
import { SignOut } from "./auth/signOutButton";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between px-5 py-2">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
        </Link>
        <div className="flex items-center gap-4 text-black">
          {session && session?.user ? (<>
            <button>
              <span>Create</span>
            </button>
            <SignOut />
            <Link href={`/profile/${session?.user?.name}`}>
              <span>{session?.user?.name}</span>
            </Link>
          </>) : (
            <SignIn />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
