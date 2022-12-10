import React, { useState } from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Router, { useRouter } from "next/router";
import { Book, Bookcase, User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import SectionsCard from "./SectionsCard";
import Book2 from "./Book2";
import Slider from "./Slider";
import { shelfDecorations } from "./Customizations";
import Modal from "../../components/layout/Modal";
import { testBooks } from "../api/testData";
import Image from "next/image";
import SearchBooks from "../../components/search";
import Head from "next/head";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    if (!session) {
      res.statusCode = 403;
      return { props: { bookcase: {} } };
    }

    // const books = await prisma.book.findMany({
    //   where: {
    //     User: { email: session.user.email },
    //   },
    // });

    const bookcase = await prisma.bookcase.findMany({
      where: {
        User: { email: session.user.email },
      },
      include: {
        books: {
          include: {
            Category: true,
          },
        },
        categories: true,
      },
    });

    return {
      props: { bookcase: bookcase[0] },
    };
  },
});

type Props = {
  books: Book[];
  bookcase: Bookcase;
};

const Drafts: React.FC<Props> = ({ bookcase }) => {
  const { user, isLoading } = useUser();
  console.log(user);

  const [selectedSection, setSelectedSection] = useState(
    // @ts-ignore
    bookcase.categories[0]
  );
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // @ts-ignore
  const books = bookcase.books;
  const sectionBooks = books?.filter(
    (book) => book.categoryId === selectedSection.id
  );

  const deleteSection = async (sectionId) => {
    const res = await axios
      .delete("/api/profile/deleteSection", {
        data: {
          sectionId: sectionId,
        },
      })
      .then((res) => {
        router.replace(router.asPath);
      });
    console.log(res);
  };
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log("selectedSection", selectedSection);

  if (isLoading) return <div>Loading</div>;

  if (!user) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  console.log("bookcase", bookcase);

  const profile = { user: { _id: "123" }, imgUrl: user.picture };

  return (
    <Layout>
      <Head>
        <title>Dashboard - ShelfSpot</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                src={shelfDecorations[bookcase.decoration || 0]?.icon}
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
              <Slider bookcaseId={bookcase.id} />
            </div>
            {/* <button onClick={refreshData}>Refresh</button> */}

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
                      onClick={() => deleteSection(selectedSection.id)}
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
          <SearchBooks bookcase={bookcase} selectedCategory={selectedSection} />
        </Modal>{" "}
      </div>
    </Layout>
  );
};

export default Drafts;
