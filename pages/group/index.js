/*
정도현
*/

import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";

const ContestIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/group/1", undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);
  return <Fragment></Fragment>;
};

export default ContestIndex;
