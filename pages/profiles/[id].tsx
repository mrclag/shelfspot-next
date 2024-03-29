import React, { useEffect, useState } from "react";
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
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../../components/layout/Loader";
import useMediaQuery from "../../utils/useMediaQuery";

export const getServerSideProps = async ({ req, res, params }) => {
  const bookcase = await prisma.bookcase.findMany({
    where: {
      User: { id: String(params?.id) },
    },
    include: {
      books: {
        include: { Category: true },
      },
      categories: {
        orderBy: [{ updatedAt: "desc" }],
      },
      User: {
        select: { imageUrl: true },
      },
    },
  });

  const jsonBookcase = JSON.parse(JSON.stringify(bookcase));

  return {
    props: { bookcase: jsonBookcase[0] },
  };
};

type Props = {
  books: Book[];
  bookcase: Bookcase & {
    categories: Categories[];
    books: Book[] & {
      categories: Categories[];
    };
    User: User;
  };
};

// TO DO Friday
// Make this a separate page, reused with different views available if logged in user - reuse component

const Dashboard: React.FC<Props> = ({ bookcase }) => {
  const { user, isLoading } = useUser();
  const [selectedSection, setSelectedSection] = useState(
    bookcase.categories[0]
  );
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [mobileDisplayShelf, setMobileDisplayShelf] = useState(false);

  const [books, setBooks] = useState(bookcase.books);
  const sectionBooks = books?.filter(
    (book) => book.categoryId === selectedSection.id
  );

  const isMobile = useMediaQuery("(max-width: 800px)");

  const router = useRouter();

  if (isLoading) return <Loader />;

  // when on mobile, default show bookshelf.
  // when click on shelf, show shelf
  // display a back button on the shelf
  // new shelf design on mobile

  return (
    <Layout>
      <Head>
        <title>ShelfSpot</title>
      </Head>
      <div className="dashboard flex">
        <div className="dashboard-wrap">
          <div className={`col1 ${!mobileDisplayShelf ? "disMob" : ""}`}>
            <div className="dashboard-topleft">
              <Link href={`/profiles/${bookcase.userId}`}>
                <div className="frame">
                  <Image
                    src={bookcase.User.imageUrl}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
              <div style={{ width: "40px" }}></div>
              {/* <Link href="/edit-profile">Edit Profile</Link> */}
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
              setSelectedSection={(bool) => {
                setMobileDisplayShelf(true);
                setSelectedSection(bool);
              }}
              isUsers={false}
              books={books}
            />
          </div>

          <div className={`col2 ${mobileDisplayShelf ? "disMob" : ""}`}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid #ddd",
              }}
            >
              {mobileDisplayShelf && isMobile && (
                <div
                  className="back-to-shelf"
                  onClick={() => setMobileDisplayShelf(false)}
                >
                  <i className="fas fa-chevron-left"></i>
                </div>
              )}
              <div className="section-title">{selectedSection.title}</div>
            </div>
            <div>
              <div className="books-section">
                {sectionBooks.map((book, i) => {
                  return <Book2 key={i} book={book} />;
                })}
                {sectionBooks.length === 0 && (
                  <div className="book-placeholder"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="side-panel">test</div> */}
        <Modal showModal={showSearchModal} setShowModal={setShowSearchModal}>
          <SearchBooks bookcase={bookcase} selectedCategory={selectedSection} />
        </Modal>{" "}
      </div>
    </Layout>
  );
};

export default Dashboard;
