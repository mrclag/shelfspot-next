import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import defaultProfile from "../../public/static/img/default.jpg";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    if (!session) {
      res.statusCode = 403;
      return { props: { initialProfile: {} } };
    }

    const profile = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const jsonProfile = JSON.parse(JSON.stringify(profile));

    return { props: { initialProfile: jsonProfile } };
  },
});

const EditProfile = ({ initialProfile }) => {
  const [imageUrl, setImageUrl] = useState(initialProfile.imageUrl);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="page-wrapper profile-page">
        <h1 className="large text-primary my-1">Your Profile</h1>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <div className="flex">
              <div style={{ borderRadius: "7px", overflow: "none" }}>
                <Image
                  src={imageUrl || defaultProfile}
                  alt="Profile Image"
                  width="100px"
                  height="100px"
                />
              </div>
              <div style={{ fontSize: "24px", margin: "20px" }}>
                {initialProfile.name}
              </div>
            </div>
            {/* <div>{JSON.stringify(initialProfile)}</div> */}

            <div>About</div>
            <div>Tags/Interests</div>
            <div>Number of Books (chart based on when added)</div>

            {/* <input
              type="text"
              placeholder="https://via.placeholder.com/150"
              className="imgUrl"
              value={imageUrl}
              onChange={setImageUrl}
              name="imgUrl"
            /> */}
            <small className="form-text"></small>
          </div>

          <input type="submit" />
        </form>
        <div>
          <button className="button delete">
            <i className="fas fa-trash"> Delete My Account</i>
          </button>
        </div>
      </div>
    </Layout>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.useProfile,
});

export default EditProfile;
