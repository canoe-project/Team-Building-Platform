import Link from "next/link";
import { Button } from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";
import React, { useState } from 'react';
import PCard from "../../components/Card/profilecard";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
`;

export default function ProfilePage() {

  let [myPhotoVar, myPhotoVarHandler] = useState("1")
  let [myFieldVar, myFieldVarHandler]  = useState("1")
  let [explanVar, explanVarHandler] = useState("안녕하세요");
  let [nameVar, nameVarHandler] = useState("오박사");
  let [addressVar, addressVarHandler] = useState("태초마을");
  let [contactAddressVar, contactAddressVarHandler] =useState("010 8465 4865");
  let [skillStackVar, skillStackVarHandler] = useState([1, 2, 3, 4])
  let [myEstimateVar, myEstimateVarHandler]  = useState(["AAA", "AAA", "AAA"])
  return (
    <>
      <h1>프로필</h1>
      <PCard
        myPhoto={myPhotoVar}
        myField={myFieldVar}
        explan={explanVar}
        name={nameVar}
        address={addressVar}
        contactAddress={contactAddressVar}
        skillStack={skillStackVar}
        myEstimate={myEstimateVar}
      />
      <h2 className={styles.title}>
      <Link href="/">
                      <Button variant="contained">메인화면</Button>
                      </Link>
      </h2>
      <style jsx>{style}</style>
    </>
  );
}
