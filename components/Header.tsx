import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import logo from "../public/static/img/logo2.png";
import Image from "next/image";
import useMediaQuery from "../utils/useMediaQuery";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const isMobile = useMediaQuery("(max-width: 800px)");

  const { user, isLoading } = useUser();

  return (
    <nav>
      <div className="desktop-nav">
        <div className="left flex-center">
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
          {user && (
            <Link href="/dashboard">
              <a className="bold" data-active={isActive("/dashboard")}>
                Dashboard
              </a>
            </Link>
          )}

          <Link href="/profiles">
            <a className="bold" data-active={isActive("/profiles")}>
              Profiles
            </a>
          </Link>
        </div>

        <div className="right">
          {user ? (
            <>
              <p>
                <Link href={`/profile`}>{user.name || user.email}</Link>
              </p>
              <Link href="/api/auth/logout">
                <a data-active={isActive("/signup")}>Logout</a>
              </Link>
            </>
          ) : isLoading ? (
            <p>Validating session ...</p>
          ) : (
            <Link href="/api/auth/login">
              <a data-active={isActive("/signup")}>Log in</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
