import { useState, useEffect } from "react";
import {
  getServerSidePropsWrapper,
  getSession,
  useUser,
} from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Landing from "../components/Landing";

export default function Home({ loading }) {

  const router = useRouter();
  const { user, isLoading } = useUser();

  if (user) router.push({ pathname: "/dashboard" });
  if (loading || isLoading) return "Loading";
  else return <Landing />;
}

export const getServerSideProps = ({ req, res }) => {
  const session = getSession(req, res);
  return { props: { loading: Boolean(session) } };
};
