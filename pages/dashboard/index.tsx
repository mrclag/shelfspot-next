import React, { useState } from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Router from "next/router";
import { Book, User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import SectionsCard from "./SectionsCard";
import Book2 from "./Book2";
import Slider from "./Slider";
import { shelfDecorations } from "./Customizations";
import Modal from "../../components/layout/Modal";
import { testBooks } from "../api/testData";
import Image from "next/image";
import SearchBooks from "../search";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    if (!session) {
      res.statusCode = 403;
      return { props: { books: [] } };
    }

    const books = await prisma.book.findMany({
      where: {
        User: { email: session.user.email },
      },
    });
    return {
      props: { books: testBooks },
    };
  },
});

type Props = {
  books: Book[];
};

const Drafts: React.FC<Props> = ({ books }) => {
  const { user, isLoading } = useUser();
  console.log(user);

  const [selectedSection, setSelectedSection] = useState({
    title: "Current",
    id: "0",
  });
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const sectionBooks = books?.filter(
    (book) => book.category === selectedSection.title
  );

  if (isLoading) return <div>Loading</div>;

  if (!user) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const profile = { user: { _id: "123" }, imgUrl: user.picture };
  const bookcase = {
    decoration: 0,
    color: 0,
    sections: [
      { title: "Current", id: "1", hide: false, bookend: "defauls" },
      { title: "Fiction", id: "2", hide: false, bookend: "robot" },
      { title: "star wars", id: "2", hide: false, bookend: "robot" },
    ],
  };

  return (
    <Layout>
      <div className="dashboard">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css"
          integrity="sha256-PF6MatZtiJ8/c9O9HQ8uSUXr++R9KBYu4gbNG5511WE="
          crossOrigin="anonymous"
        />
        <div className="dashboard-wrap">
          <div className="col1">
            <div className="dashboard-topleft">
              <Link href={`/profile/${profile.user._id}`}>
                <div className="frame" style={{ height: "100px" }}>
                  <img
                    src={profile.imgUrl}
                    alt="Mona Lisa"
                    className="profile-img"
                  />
                </div>
              </Link>
              {/* <Link href="/edit-profile">
                Edit Profile
              </Link> */}
              <Image
                src={shelfDecorations[bookcase.decoration]?.icon}
                alt=""
                className="decoration"
                width="120px"
                height="120px"
              />
            </div>
            <SectionsCard
              bookcase={bookcase}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
              books={books}
            />
          </div>

          <div className="col2">
            <div className="dashboard-topright">
              <Slider />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="section-title">
                {selectedSection.title} section
              </div>
              <div
                className="section-delete"
                onClick={() => setShowSectionModal(true)}
              >
                <i className="fas fa-ellipsis-h"></i>
              </div>
              {showSectionModal && (
                <Modal
                  showModal={showSectionModal}
                  setShowModal={setShowSectionModal}
                >
                  <div
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      borderBottom: "0.5px solid #555",
                    }}
                  >
                    {selectedSection.title}
                  </div>
                  <div
                    style={{
                      width: "100px",
                      lineHeight: "50px",
                      color: "black",
                    }}
                  >
                    <div
                      className="menu-item"
                      // onClick={() => deleteSection(selectedSection.id)}
                    >
                      Delete
                    </div>
                  </div>
                </Modal>
              )}
            </div>
            <div>
              <div className="books-section">
                {sectionBooks.map((book, i) => {
                  return <Book2 key={i} book={book} profile={profile} />;
                })}
                <div
                  onClick={(showModal) => setShowSearchModal(true)}
                  className="add-new-book"
                >
                  <i className="fas fa-plus-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal showModal={showSearchModal} setShowModal={setShowSearchModal}>
          <SearchBooks selectedSection={selectedSection} />
        </Modal>{" "}
      </div>
    </Layout>
  );
};

export default Drafts;
