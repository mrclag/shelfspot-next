import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Router, { useRouter } from "next/router";
import { Book, Bookcase, Categories, User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import SectionsCard from "../../components/bookcase/SectionsCard";
import Book2 from "../../components/bookcase/Book2";
import Slider from "../../components/Slider";
import { shelfDecorations } from "../../utils/Customizations";
import Modal from "../../components/layout/Modal";
import Image from "next/image";
import SearchBooks from "../../components/search";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../../components/layout/Loader";
import useMediaQuery from "../../utils/useMediaQuery";

export const getServerSideProps = withPageAuthRequired({
  returnTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);
    if (!session) {
      res.statusCode = 403;
      return {
        props: {
          bookcase: {
            categories: [],
          },
        },
      };
    }

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
        categories: {
          orderBy: [
            {
              updatedAt: "desc",
            },
          ],
        },
      },
    });

    const jsonBookcase = JSON.parse(JSON.stringify(bookcase));

    return {
      props: { bookcase: jsonBookcase[0] },
    };
  },
});

type Props = {
  books: Book[];
  bookcase: Bookcase & {
    categories: Categories[];
    books: Book[] & {
      categories: Categories[];
    };
  };
};

const Dashboard: React.FC<Props> = ({ bookcase }) => {
  const { user, isLoading } = useUser();
  const [selectedSection, setSelectedSection] = useState(
    bookcase.categories[0]
  );
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(selectedSection.title);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSliderModal, setShowSliderModal] = useState(false);

  const [mobileDisplayShelf, setMobileDisplayShelf] = useState(false);

  const books = bookcase.books;
  const sectionBooks = books?.filter(
    (book) => book.categoryId === selectedSection.id
  );

  const titleRef = useRef();

  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    setEditTitle(false);
    setNewTitle(selectedSection.title);
  }, [selectedSection]);

  const deleteSection = async (sectionId) => {
    if (bookcase.categories.length === 1)
      return toast.error("Your bookcase must have at least one shelf.");
    toast.promise(
      axios
        .delete("/api/profile/deleteSection", {
          data: {
            sectionId: sectionId,
          },
        })
        .then((res) => {
          router.replace(router.asPath);
          setShowSectionModal(false);
          const category = bookcase.categories.filter(
            (cat) => cat.id !== sectionId
          )[0];

          setSelectedSection(category);
        }),
      {
        loading: "Removing shelf...",
        success: "Shelf removed",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const updateSectionName = async (sectionId) => {
    if (selectedSection.title === newTitle) return setEditTitle(false);
    toast.promise(
      axios
        .put("/api/profile/updateSection", {
          sectionId: sectionId,
          title: newTitle,
        })
        .then(() => {
          router.replace(router.asPath);
          setEditTitle(false);
          setSelectedSection({ ...selectedSection, title: newTitle });
        }),
      {
        loading: "Updating shelf name...",
        success: "Shelf name updated",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const router = useRouter();

  if (isLoading) return <Loader />;

  if (!user) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  // when on mobile, default show bookshelf.
  // when click on shelf, show shelf
  // display a back button on the shelf
  // new shelf design on mobile

  return (
    <Layout>
      <Head>
        <title>Dashboard - ShelfSpot</title>
      </Head>
      <div className="dashboard flex">
        <div className="dashboard-wrap">
          <div className={`col1 ${!mobileDisplayShelf ? "disMob" : ""}`}>
            <div className="dashboard-topleft">
              <Link href={`/profiles/${bookcase.userId}`}>
                <div className="frame">
                  <Image src={user.picture} layout="fill" objectFit="cover" />
                </div>
              </Link>
              <div style={{ width: "40px" }}></div>
              {/* <Link href="/edit-profile">Edit Profile</Link> */}
              <div
                onClick={() => setShowSliderModal(true)}
                style={{ height: "120px" }}
              >
                <Image
                  src={shelfDecorations[bookcase.decoration || 0]?.icon}
                  alt=""
                  className="decoration"
                  width="120px"
                  height="120px"
                />
              </div>
            </div>
            <SectionsCard
              bookcase={bookcase}
              selectedSection={selectedSection}
              setSelectedSection={(bool) => {
                setMobileDisplayShelf(true);
                setSelectedSection(bool);
              }}
              books={books}
            />
          </div>

          <div className={`col2 ${mobileDisplayShelf ? "disMob" : ""}`}>
            {!isMobile && <div className="dashboard-topright"></div>}
            {/* <button onClick={refreshData}>Refresh</button> */}
            {mobileDisplayShelf && (
              <div
                className="back-to-shelf"
                onClick={() => setMobileDisplayShelf(false)}
              >
                <i className="fas fa-chevron-left"></i>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {editTitle ? (
                <form className="section-title">
                  <input
                    type="text"
                    value={newTitle}
                    autoFocus
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <i
                    className="fas fa-check check-title"
                    onClick={() => updateSectionName(selectedSection.id)}
                  ></i>
                </form>
              ) : (
                <div className="section-title">
                  {selectedSection.title}
                  <i
                    ref={titleRef}
                    className="fas fa-pen edit-title"
                    onClick={() => setEditTitle(true)}
                  ></i>
                </div>
              )}
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
                      padding: "10px 20px",
                      paddingRight: "40px",
                      borderBottom: "0.5px solid #555",
                      fontSize: "20px",
                    }}
                  >
                    {selectedSection.title}
                  </div>
                  <div
                    style={{
                      width: "100px",
                      color: "#333",
                      lineHeight: "50px",
                      padding: "10px 20px",
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
                  return <Book2 key={i} book={book} />;
                })}
                <div
                  onClick={(showModal) => setShowSearchModal(true)}
                  className="add-new-book"
                >
                  {/* <i className="fas fa-plus-circle"></i> */}
                  Add Book
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="side-panel">test</div> */}
        <Modal showModal={showSearchModal} setShowModal={setShowSearchModal}>
          <SearchBooks bookcase={bookcase} selectedCategory={selectedSection} />
        </Modal>{" "}
        <Modal showModal={showSliderModal} setShowModal={setShowSliderModal}>
          <div>Select Decoration</div>
          <Slider bookcaseId={bookcase.id} />
        </Modal>{" "}
      </div>
    </Layout>
  );
};

export default Dashboard;
