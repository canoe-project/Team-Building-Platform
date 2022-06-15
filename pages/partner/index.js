

import { useEffect } from "react";
import { useRouter } from "next/router";

const ContestIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push("/partner/1", undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);
  return <></>;
};

export default ContestIndex;
