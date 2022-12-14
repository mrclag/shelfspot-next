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
import axios from "axios";
import { convertFromRaw, EditorState } from "draft-js";

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

  const saveBook = async () => {
    console.log("CONTENT", content);
    const res = await axios.post("/api/bookcase/saveBook", {
      bookId: book.id,
      content: JSON.stringify(content),
    });
    console.log(res);
  };

  let bookContent;
  if (book.userContent.length > 0) {
    bookContent = EditorState.createWithContent(
      convertFromRaw(JSON.parse(book.userContent))
    );
  }

  return (
    <Layout>
      <Head>
        <title>ShelfSpot {book.title && `- ${book.title}`}</title>
      </Head>
      <div className="page-wrapper">
        <h2>{book.title || "Untitled"}</h2>
        <p>
          By{" "}
          {book?.authors?.length > 0
            ? book.authors.join(", ")
            : book.authors
            ? book.authors
            : "Unknown author"}
        </p>
        {/* <ReactMarkdown children={props.content} /> */}
        <button onClick={saveBook}>Save</button>

        {/* <RichText /> */}
        <RichText setContent={setContent} initialContent={bookContent} />

        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(book.id)}>Delete</button>
        )}
      </div>
    </Layout>
  );
};

export default Book;
