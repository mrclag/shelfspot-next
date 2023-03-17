import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";
import Layout from "../../components/layout/Layout";
import prisma from "../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0";
import { Book, User } from "@prisma/client";
import RichText, { saveBook } from "../../components/richText/RichText2";
import Head from "next/head";
import toast from "react-hot-toast";
import axios from "axios";
import ReactStars from "react-stars";
import Switch from "react-switch";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.book.findMany({});
  const paths = res?.map((post) => {
    return { params: { id: post.id.toString() } };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookResult = await prisma.book.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      User: { select: { email: true } },
    },
  });

  const book = JSON.parse(JSON.stringify(bookResult));

  return {
    props: { book },
    revalidate: 10,
  };
};

type Props = {
  book: Book & {
    User: User;
  };
};

const Book: React.FC<Props> = ({ book }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Authenticating ...</div>;
  }
  const [display, setDisplay] = useState(!book.hidden);
  const userHasValidSession = Boolean(user);
  const postBelongsToUser = user?.email === book.User.email;
  // const postBelongsToUser = true;

  console.log(book);

  const deleteBook = async () => {
    toast.promise(
      axios
        .delete(`/api/bookcase/deleteBook`, {
          data: { bookId: book.id },
        })
        .then(() => Router.push("/dashboard")),
      {
        loading: "Removing book...",
        success: "Book removed from shelf! 🎉",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const ratingChanged = (starValue: number) => {
    if (!postBelongsToUser) return;
    saveBook(book.id, { rating: starValue });
  };

  const displayChanged = async (displayValue: boolean) => {
    if (!postBelongsToUser) return;
    await saveBook(book.id, { display: displayValue });
    setDisplay(displayValue);
  };

  const author =
    book?.authors?.length > 0
      ? book.authors.join(", ")
      : book.authors
      ? book.authors
      : "Unknown author";

  const checkedIcon = (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "14px",
      }}
    >
      <i className="fas fa-book-open"></i>
    </div>
  );

  return (
    <Layout>
      <Head>
        <title>ShelfSpot {book.title && `- ${book.title}`}</title>
      </Head>
      <div className="page-wrapper book-page">
        <div className="book-page-content">
          <div className="book-page-info">
            <img
              // @ts-ignore
              src={book.imageLinks[0]?.smallThumbnail}
              className="book-page-image"
              alt="book"
            />
            <div>
              <h3 className="book-title">{book.title || "Untitled"}</h3>
              <p>By {author}</p>
              <div
                style={{
                  fontSize: "14px",
                  color: "#333",
                  paddingBottom: "8px",
                }}
              >
                {book.pageCount} pages
              </div>
              <ReactStars
                count={5}
                value={book.rating}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />
              <div className="flex-center" style={{ margin: "6px 0px" }}>
                <Switch
                  onChange={displayChanged}
                  checked={display}
                  checkedIcon={checkedIcon}
                />
                <div style={{ marginLeft: "8px", fontSize: "14px" }}>
                  {display ? "Public" : " Hidden"}
                </div>
              </div>
            </div>
          </div>

          <RichText
            bookId={book.id}
            initialContent={book.userContent}
            postBelongsToUser={postBelongsToUser}
          />

          {postBelongsToUser && (
            <div className="flex-center">
              <div
                className="button-basic-sm"
                style={{ margin: "20px auto" }}
                onClick={deleteBook}
              >
                Remove Book
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Book;
