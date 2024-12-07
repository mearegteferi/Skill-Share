import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function Header() {
  return (
    <header className="bg-[#1f1f1f] sticky top-0 z-20 w-full flex justify-between items-center border-b border-gray-500 p-8">
      <div className="text-white font-bold">Sofi Restaurant</div>
      <Nav />
    </header>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="hidden md:flex gap-4 text-white font-bold">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <IoClose /> : <FiMenu />}
        </button>
        {isOpen && (
          <div className="flex flex-col items-center gap-4 mt-4 text-white">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      <a href="#">Home</a>
      <a href="#">Menu</a>
      <a href="#">Book</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </>
  );
}

export default Header;
