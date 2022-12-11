import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import { useUser } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import axios from "axios";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";

export const getServerSideProps = async ({ req, res }) => {
  const profiles = await prisma.user.findMany({
    skip: 0,
    take: 10,
  });

  console.log(profiles);

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
      <div className="profiles-page container">
        <div className="search-bar">
          <form className="search-form" onSubmit={(e) => onSubmit(e)}>
            <div className="search-title">Search Profiles</div>
            <input
              className="search-input"
              type="search"
              placeholder="Matt Clagett"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="submit"
              className="search-button btn btn-primary"
              style={{
                borderRadius: "5px",
                marginLeft: "5px",
                transform: "translateX(2px)",
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        {results.length > 0 &&
          results.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))}
      </div>
    </Layout>
  );
};

export default Profiles;
