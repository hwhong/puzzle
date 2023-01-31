import { useRouter } from "next/router";
import React from "react";

export default function Puzzle({ message }) {
  const router = useRouter();
  const { puzzleId } = router.query;
  console.log(router.query);
  return (
    <div>
      <p>{message}</p>
      <p>{puzzleId}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: { message: "dynamic page part 2" }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const posts = ["wave", "kiss"];
  const paths = posts.map((post) => ({
    params: { puzzleId: post },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
