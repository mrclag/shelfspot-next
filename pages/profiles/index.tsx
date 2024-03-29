import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileItem from "../../components/ProfileItem";
import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import axios from "axios";
import prisma from "../../lib/prisma";
import Layout from "../../components/layout/Layout";
import Head from "next/head";

export const getServerSideProps = async ({ req, res }) => {
  const profiles = await prisma.user.findMany({
    skip: 0,
    take: 10,
    include: {
      books: {
        include: {
          Category: true,
        },
      },
    },
  });

  const initialProfiles = JSON.parse(JSON.stringify(profiles));

  return {
    props: { initialProfiles },
  };
};

type Props = {
  initialProfiles: User[];
};

const Profiles = ({ initialProfiles }) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(initialProfiles);

  const user = useUser();

  // Load profiles to state when first loading

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/profiles", {
      searchValue,
      skip: 0,
      take: 10,
    });
    setResults(res.data);
  };

  return (
    <Layout>
      <Head>
        <title>Profiles - ShelfSpot</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="profiles-page container">
        <form className="search-form" onSubmit={(e) => onSubmit(e)}>
          <div className="search-bar">
            <input
              className="search-input"
              type="search"
              placeholder="Search Profiles"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
              {/* Search */}
            </button>
          </div>
        </form>
        <div className="profile-items">
          {results.length > 0 &&
            results.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profiles;
