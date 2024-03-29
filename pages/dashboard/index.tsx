import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import prisma from "../../lib/prisma";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Router, { useRouter } from "next/router";
import { Book, Bookcase, Categories, User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import SectionsCard from "../../components/bookcase/Bookcase";
import Book2 from "../../components/bookcase/SectionBook";
import Slider from "../../components/decorations/Slider";
import { shelfDecorations } from "../../utils/Customizations";
import Modal from "../../components/layout/Modal";
import Image from "next/image";
import SearchBooks from "../../components/search";
import Head from "next/head";
import toast from "react-hot-toast";
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
            User: { select: { email: true } },
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
  const [books, setBooks] = useState(bookcase.books);

  const sectionBooks = books?.filter(
    (book) => book.categoryId === selectedSection.id
  );
  const unsortedBooks = books?.filter((book) => book.categoryId === null);

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

  return (
    <Layout>
      <Head>
        <title>Dashboard - ShelfSpot</title>
      </Head>
      <div className="dashboard flex">
        <div className="col0"></div>
        <div className="dashboard-wrap">
          <div className={`col1 ${!mobileDisplayShelf ? "disMob" : ""}`}>
            <div className="dashboard-topleft">
              <Link href={`/profiles/${bookcase.userId}`}>
                <div className="frame">
                  <Image src={user.picture} layout="fill" objectFit="cover" />
                </div>
              </Link>
              <div style={{ width: "40px" }}></div>

              <div
                onClick={() => setShowSliderModal(true)}
                style={{ height: "120px", cursor: "pointer" }}
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
              setBooks={setBooks}
              setSelectedSection={(bool) => {
                setMobileDisplayShelf(true);
                setSelectedSection(bool);
              }}
              books={books}
            />
          </div>
          {/* <Dnd /> */}

          <div className={`col2 ${mobileDisplayShelf ? "disMob" : ""}`}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "5px",
              }}
            >
              {mobileDisplayShelf && isMobile && (
                <div
                  className="back-to-shelf"
                  onClick={() => setMobileDisplayShelf(false)}
                >
                  <i className="fas fa-arrow-left"></i>
                </div>
              )}
              {editTitle ? (
                <form
                  className="section-title"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateSectionName(selectedSection.id);
                  }}
                >
                  <input
                    type="text"
                    value={newTitle}
                    autoFocus
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <i
                    className="fas fa-check section-delete"
                    onClick={() => updateSectionName(selectedSection.id)}
                  ></i>
                </form>
              ) : (
                <div className="section-title">{selectedSection.title}</div>
              )}

              <div
                ref={titleRef}
                className="section-delete"
                onClick={() => setShowSearchModal(true)}
              >
                <i className="fas fa-plus"></i>
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
                  <div className="modal-title">{selectedSection.title}</div>
                  <div className='menu-items'>
                    <div
                      className="menu-item"
                      onClick={() => {
                        setEditTitle(true);
                        setShowSectionModal(false);
                      }}
                    >
                      Rename
                    </div>
                    <div
                      className="menu-item"
                      onClick={() => {
                        deleteSection(selectedSection.id);
                        setShowSectionModal(false);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </Modal>
              )}
            </div>
            <div className="books-section">
              {sectionBooks.map((book, i) => {
                return <Book2 key={i} book={book} />;
              })}
            </div>
          </div>
        </div>
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
