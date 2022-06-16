/*
정도현
*/


import { useEffect } from "react";
import { useRouter } from "next/router";

const reqArticlePath = async (contestID) => {
  const article = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/Get/${contestID}/articleTo`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });

  return article;
};

const ContestIndex = () => {
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    reqArticlePath(id).then((id) => {
      router.push(`/contest/Read/${id.article_id}`, undefined, {
        shallow: true,
      });
    });
    // Always do navigations after the first render
  }, [router]);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);
  return <></>;
};

export default ContestIndex;
