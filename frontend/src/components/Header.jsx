import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { NavLink } from 'react-router';
import Head from '../assets/head.jpeg';

function Header() {
  return (
    <header
      className="sticky top-0 z-20 flex w-full items-center justify-center bg-cover p-6"
      style={{ backgroundImage: `url(${Head})` }}
    >
      <Nav />
    </header>
  );
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav>
      <div className="hidden gap-16 text-xl font-bold text-white md:flex">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <IoClose /> : <FiMenu />}
        </button>
        {isOpen && (
          <div className="mt-4 flex flex-col items-center gap-4 text-white">
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
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'text-gold underline' : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) => (isActive ? 'text-gold' : '')}
      >
        Menu
      </NavLink>
      <NavLink
        to="/book"
        className={({ isActive }) => (isActive ? 'text-gold' : '')}
      >
        Book
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'text-gold' : '')}
      >
        About
      </NavLink>
      <NavLink
        to="contact"
        className={({ isActive }) => (isActive ? 'text-gold' : '')}
      >
        Contact
      </NavLink>
    </>
  );
}

export default Header;
