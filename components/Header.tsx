"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isLoggedIn } from '../utils/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { NEXT_PUBLIC_API_BASE_URL } from '@/utils/const/const';
import Image from 'next/image';

interface NavigationLink {
  href: string;
  text: string;
  isActive?: boolean;
}

interface HeaderProps {
  logoImage: string;
  logoSrc: string;
  logoAlt: string;
  companyName: string;
  loginLink: string;
  navigationLinks: NavigationLink[];
  myBlogLink: string;
}

const Header: React.FC<HeaderProps> = ({
  logoSrc,
  companyName,
  loginLink,
  navigationLinks,
  myBlogLink
}) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInStatus = isLoggedIn();
    setLoggedIn(loggedInStatus);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        setLoggedIn(false);
        dispatch(logout());
        router.push(loginLink);
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false); // Close menu function

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center gap-4">
            <Image
              src="/avertra-white-logo.png"
              alt="Example Image"
              width={165}
              height={22}
              priority={true} /* Preload this image */
            />
            <Link href={logoSrc} className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {companyName}
              </span>
            </Link>
          </div>
          <div className="flex items-center lg:order-2 xl:w-auto w-full">
            {!loggedIn ? (
              <>
                <Link
                  href={loginLink}
                  className="rounded focus:outline-none transition-all bg-blue-500 text-white hover:bg-blue-600 text-base px-4 py-2 w-full"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Logout
                </button>
                <Link
                  href={myBlogLink}
                  className="rounded focus:outline-none transition-all bg-blue-500 text-white hover:bg-blue-600 text-base px-4 py-2 xl:m-0 ml-auto"
                >
                  Create Blog
                </Link>
              </>
            )}

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={menuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {loggedIn && (
            <div
              className={`${menuOpen ? 'block' : 'hidden'
                } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {navigationLinks.map((link, index) => (
                  <li
                    key={index}
                    className={`block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${index === navigationLinks.length - 1 ? 'border-b-0' : ''
                      }`}
                  >
                    <Link
                      href={link.href}
                      aria-current={link.isActive ? 'page' : undefined}
                      onClick={closeMenu} // Close menu on click
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
