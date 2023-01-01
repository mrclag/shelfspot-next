import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import logo from "../public/static/img/logo2.png";
import Image from "next/image";
import useMediaQuery from "../utils/useMediaQuery";
import useDropdownMenu from "../utils/useDropdown";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

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

        <div className="right flex">
          {user && (
            <Link href="/dashboard">
              <a className="bold" data-active={isActive("/dashboard")}>
                Dashboard
              </a>
            </Link>
          )}

          <Link href="/profiles">
            <a
              className="bold"
              style={{ marginRight: "30px" }}
              data-active={isActive("/profiles")}
            >
              Profiles
            </a>
          </Link>
          {user ? (
            <div className="term-dropdown">
              <button
                className="term-dropdown-button"
                {...buttonProps}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "50%",
                    position: "relative",
                    width: "35px",
                    height: "35px",
                  }}
                >
                  <Image src={user.picture} layout="fill"></Image>
                </div>
                {/* <i className="fa fa-ellipsis-v" aria-hidden="true"></i> */}
              </button>
              <div
                className={isOpen ? "term-menu visible" : "term-menu"}
                role="menu"
              >
                <div className="term-menu__item" {...itemProps[0]}>
                  <Link href={`/profile`}>My Profile</Link>
                </div>
                <div className="term-menu__item" {...itemProps[1]}>
                  <Link href="/api/auth/logout">
                    <a data-active={isActive("/signup")}>Logout</a>
                  </Link>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <p>Validating session ...</p>
          ) : (
            <Link href="/api/auth/login">
              <a
                className="create-account-button"
                data-active={isActive("/signup")}
              >
                Log in
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
