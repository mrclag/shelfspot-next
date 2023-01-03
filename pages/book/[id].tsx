import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0";
import { Book } from "@prisma/client";
import RichText, { saveBook } from "../../components/richText/RichText2";
import Head from "next/head";
import toast from "react-hot-toast";
import axios from "axios";
import ReactStars from "react-stars";

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
  });

  const book = JSON.parse(JSON.stringify(bookResult));

  console.log(book);

  return {
    props: { book },
    revalidate: 10,
  };
};

type Props = {
  book: Book;
};

const Book: React.FC<Props> = ({ book }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Authenticating ...</div>;
  }
  const display = true;
  const userHasValidSession = Boolean(user);
  // const postBelongsToUser = user?.email === props.author?.email;
  const postBelongsToUser = true;

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
    saveBook(book.id, { rating: starValue });
  };

  const author =
    book?.authors?.length > 0
      ? book.authors.join(", ")
      : book.authors
      ? book.authors
      : "Unknown author";

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
              <h3>{book.title || "Untitled"}</h3>
              <p>By {author}</p>

              <ReactStars
                count={5}
                value={book.rating}
                onChange={ratingChanged}
                size={24}
                color2={"#ffd700"}
              />
              <input type="checkbox" checked={display} />
              <div>(hidden toggle)</div>
            </div>
          </div>

          <RichText bookId={book.id} initialContent={book.userContent} />

          <div className="flex">
            <button onClick={deleteBook}>Delete</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Book;
