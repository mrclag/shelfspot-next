import React, { useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0";
import { Book } from "@prisma/client";
import RichText from "../../components/richText/RichText2";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { convertFromRaw, EditorState } from "draft-js";
import Image from "next/image";
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

  return {
    props: { book },
    revalidate: 10,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/home");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/home");
}

type Props = {
  book: Book;
};

const Book: React.FC<Props> = ({ book }) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(user);
  // const postBelongsToUser = user?.email === props.author?.email;
  const postBelongsToUser = true;

  const [content, setContent] = useState({});
  const [rating, setRating] = useState(book.rating);

  const saveBook = async () => {
    toast.promise(
      axios.post("/api/bookcase/saveBook", {
        bookId: book.id,
        content: JSON.stringify(content),
      }),
      {
        loading: "Saving...",
        success: "Book saved! 🎉",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const deleteBook = async () => {
    toast.promise(
      axios
        .delete(`/api/bookcase/deleteBook`, {
          data: { bookId: book.id },
        })
        .then(() => Router.push("/dashboard")),
      {
        loading: "Saving...",
        success: "Book removed from shelf! 🎉",
        error: `Something went wrong 😥 Please try again`,
      }
    );
  };

  const ratingChanged = (starValue) => {
    setRating(starValue);
  };

  let bookContent;
  if (book.userContent.length > 0) {
    bookContent = EditorState.createWithContent(
      convertFromRaw(JSON.parse(book.userContent))
    );
  }

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
      <div
        className="page-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "30px",
        }}
      >
        <img
          // @ts-ignore
          src={book.imageLinks[0]?.smallThumbnail}
          className="book-image"
          alt="book"
        />
        <h2>{book.title || "Untitled"}</h2>
        <p>By {author}</p>

        <ReactStars
          value={rating}
          count={5}
          onChange={ratingChanged}
          size={24}
          color2={"#ffd700"}
        />
        {/* <ReactMarkdown children={props.content} /> */}

        {/* <RichText /> */}
        <RichText setContent={setContent} initialContent={bookContent} />

        <div className="flex">
          <button onClick={saveBook}>Save</button>
          <button onClick={deleteBook}>Delete</button>
        </div>
      </div>
    </Layout>
  );
};

export default Book;
