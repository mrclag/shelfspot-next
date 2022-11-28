import { useState, useEffect } from "react";
import {
  getServerSidePropsWrapper,
  getSession,
  useUser,
} from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import landingImgDash from "../assets/landing-img-dash.png";
import iconBooks from "../assets/icon-books.png";
import iconPlant from "../assets/icon-plant.png";
import iconWrite from "../assets/icon-write.png";
import iconStats from "../assets/icon-stats.png";
import { route } from "next/dist/server/router";
import Layout from "../components/Layout";
import Landing from "../components/Landing";

export default function Home({ loading }) {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { user, isLoading } = useUser();

  if (user) router.push({ pathname: "/home" });
  if (loading || isLoading) return "Loading";
  else return <Landing />;
}

export const getServerSideProps = ({ req, res }) => {
  const session = getSession(req, res);
  return { props: { loading: Boolean(session) } };
};
