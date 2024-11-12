import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

function Header() {
  return (
    <header className="py-5 px-5 xl:px-0 max-w-wrapper mx-auto flex justify-between items-center">
      <Link href="https://earthfast.com" className="flex items-center gap-3">
        <Image
          width={36}
          height={36}
          src="/dark-logo.svg"
          alt="Earth fast logo"
          className="hidden dark:block w-6 h-6 sm:w-9 sm:h-9"
        />
        <Image
          width={36}
          height={36}
          src="/logo.svg"
          alt="Earth fast logo"
          className="dark:hidden w-6 h-6 sm:w-9 sm:h-9"
        />
        <h1 className="font-bold text-lg sm:text-2xl text-">EarthFast</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="inverted" className="leading-3 !py-3 font-bold" href="https://dashboard.earthfast.com" target="_blank" rel="noopener noreferrer">
          Get Started
        </Button>
      </div>
    </header>
  );
}

export default Header;
