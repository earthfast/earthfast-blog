import Image from "next/image";
import { FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="max-w-wrapper mx-auto py-10 flex flex-col gap-8 mt-9">
        <div className="flex justify-between items-center w-full flex-col sm:flex-row gap-8">
          <div className="flex items-center gap-3">
            <Image
              width={32}
              height={32}
              src="/logo.svg"
              alt="Earth fast logo"
              className="dark:hidden"
            />
            <Image
              width={32}
              height={32}
              src="/dark-logo.svg"
              alt="Earth fast logo"
              className="hidden dark:block"
            />
            <h1 className="font-bold text-lg sm:text-2xl text-">EarthFast</h1>
          </div>
          <div className="">
            <a href="mailto:contact@earthfast.com">contact@earthfast.com</a>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://x.com/EarthFastHQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-white-light-mask after:bottom-[-5px]">
                <FaTwitter size={28} color="#2E93FF" className="dark:hidden" />
              </div>
              <FaTwitter size={28} className="hidden dark:block" />
            </a>
            <a
              href="https://github.com/earthfast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative after:content-[''] after:absolute after:w-full after:h-full after:bg-white-light-mask after:bottom-[-5px]">
                <FaGithub size={28} color="#2E93FF" className="dark:hidden" />
              </div>
              <FaGithub size={28} className="hidden dark:block" />
            </a>
          </div>
        </div>
      </footer>
      {/* <div className="flex w-full text-[11px] dark:text-body-dark items-center justify-center">
        <p className=" text-center px-4 pb-2">
          Need to report a copyright or compliance violations? Email{" "}
          <a href="mailto:compliance@earthfast.com" className="">
            compliance@earthfast.com
          </a>
        </p>
      </div> */}
    </>
  );
}

export default Footer;
