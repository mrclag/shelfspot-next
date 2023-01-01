import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import logo from "../public/static/img/logo2.png";
import Image from "next/image";
import useMediaQuery from "../utils/useMediaQuery";
import useOnClickOutside from "../utils/useOnClickOutside";

const Header: React.FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const navRef = useRef();

  useOnClickOutside(navRef, (e) => {
    console.log(e);
    showMenu && setShowMenu(false);
  });

  useEffect(() => {
    setShowMenu(false);
  }, []);

  const { user, isLoading } = useUser();

  return (
    <nav>
      <div className="desktop-nav">
        <div className="left flex-center">
          <Link href="/">
            <div className="flex nav-logo">
              <Image
                src={logo}
                alt=""
                className="decoration"
                width="40px"
                height="40px"
              />
              <div className="nav-logo-font">ShelfSpot</div>
            </div>
          </Link>
        </div>

        <div className="right">
          <i
            className="fas fa-bars"
            onClick={() => !showMenu && setShowMenu(true)}
          />
        </div>
      </div>
      <div className={`mobile-menu ${showMenu && "display-menu"}`} ref={navRef}>
        <div className="flex-apart nav-logo nav-link">
          <div className="flex-center">
            <Image
              src={logo}
              alt=""
              className="decoration"
              width="40px"
              height="40px"
            />
            <div className="nav-logo-font">ShelfSpot</div>
          </div>
          <i className="fas fa-times" onClick={() => setShowMenu(false)}></i>
        </div>

        {user && (
          <div className="nav-link">
            <Link href="/dashboard">
              <a className="bold" data-active={isActive("/dashboard")}>
                Dashboard
              </a>
            </Link>
          </div>
        )}
        <div className="nav-link">
          <Link href="/profiles">
            <a className="bold" data-active={isActive("/profiles")}>
              Profiles
            </a>
          </Link>
        </div>
        {user ? (
          <div className="nav-link">
            <Link href="/api/auth/logout">
              <a data-active={isActive("/signup")}>Logout</a>
            </Link>
          </div>
        ) : isLoading ? (
          <p>Validating session ...</p>
        ) : (
          <div className="nav-link">
            <Link href="/api/auth/login">
              <a data-active={isActive("/signup")}>Log in</a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
