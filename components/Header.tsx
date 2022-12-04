import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useUser } from "@auth0/nextjs-auth0";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { user, isLoading } = useUser();

  let left = (
    <div className="left">
      <Link href="/home">
        <a className="bold" data-active={isActive("/home")}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  if (isLoading) {
    left = (
      <div className="left">
        <Link href="/home">
          <a className="bold" data-active={isActive("/home")}>
            Feed
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!user) {
    right = (
      <div className="right">
        <Link href="/api/auth/login">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
      </div>
    );
  }

  if (user) {
    left = (
      <div className="left">
        <Link href="/home">
          <a className="bold" data-active={isActive("/home")}>
            Feed
          </a>
        </Link>
        <Link href="/dashboard">
          <a className="bold" data-active={isActive("/dashboard")}>
            Dashboard
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {user.name} ({user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>

        <Link href="/api/auth/logout">
          <a data-active={isActive("/signup")}>Logout</a>
        </Link>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;
