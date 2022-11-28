import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useUser } from "@auth0/nextjs-auth0";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.post.findMany({
    where: { published: true },
  });
  const paths = res?.map((post) => {
    return { params: { id: post.id.toString() } };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  return {
    props: post,
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

const Post: React.FC<PostProps> = (props) => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(user);
  const postBelongsToUser = user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />

        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
