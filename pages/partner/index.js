<<<<<<< HEAD
import { useEffect } from "react";
import { useRouter } from "next/router";
=======
import Link from "next/link";
import { Button, ButtonGroup } from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";
>>>>>>> 6cee47e113dccb421ff2295a2d1512ced341f65e

const ContestIndex = () => {
  const router = useRouter();

<<<<<<< HEAD
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
=======
export default function PartnerSearchPage() {
  return (
    <>
      <h1>파트너 탐색</h1>
      <h2 className={styles.title}>
      <Link href="/">
      <Button variant="contained">메인화면</Button>
      </Link>
      </h2>
      <style jsx>{style}</style>
    </>
  );
}
>>>>>>> 6cee47e113dccb421ff2295a2d1512ced341f65e
