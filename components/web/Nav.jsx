import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="assets/images/Velox.svg"
          alt="logo"
          width={100}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex">
        <div className="flex gap-3 md:gap-5">
          <Button component="a" href="/app" ariant="filled">
            App
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
