import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../lib/prisma";
import Layout from "../../components/Layout";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    if (!session) {
      res.statusCode = 403;
      return { props: { profile: {} } };
    }

    const profile = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const jsonProfile = JSON.parse(JSON.stringify(profile));

    return { props: { profile: jsonProfile } };
  },
});

const EditProfile = ({ profile }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  console.log(profile);

  return (
    <Layout>
      <div className="container profile-page">
        <h1 className="large text-primary my-1">Your Profile</h1>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <div className="form-input-title">Profile Image URL</div>
            <input
              type="text"
              placeholder="https://via.placeholder.com/150"
              className="imgUrl"
              name="imgUrl"
            />
            <small className="form-text"></small>
          </div>

          <input type="submit" className="btn btn-primary my-1" />
          <div className="btn btn-light my-1">
            <Link href="/dashboard">Go Back</Link>
          </div>
        </form>
        <div className="my-2">
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
