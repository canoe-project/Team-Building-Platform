import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { Button } from '@mui/material';
import css from "styled-jsx/css";
import React, { useState } from 'react';
import CCard from "../../components/Card/Contestcard";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 1rem;
  }
  .grid2 {
    display: grid;
    grid-template-columns: 200px 200px 200px 200px;
  }
`;

export default function CompetitionSearchPage() {

  let [chosenField, chosenFieldHandler] = useState("0")



  return (
    <>
      <h1>대회 탐색</h1>
      <h2 className="grid2">
      <Button 
      variant="outlined"
      onClick={() => {chosenFieldHandler( chosenField = "1")}}
      >분야1</Button>
      <Button 
      variant="outlined"
      onClick={() => {chosenFieldHandler( chosenField = "2")}}
      >분야2</Button>
      <Button 
      variant="outlined"
      onClick={() => {chosenFieldHandler( chosenField = "3")}}
      >분야3</Button>
      <Button 
      variant="outlined"
      onClick={() => {chosenFieldHandler( chosenField = "4")}}
      >분야4</Button>
      <Button 
      variant="outlined"
      onClick={() => {chosenFieldHandler( chosenField = "5")}}
      >분야5</Button>
      </h2>
      <h2 className={styles.grid}>
      <CCard
        participants="10"
        field="1"
        maintitle="xx 공모전"
        subtitle="zzz를 위한"
        explan="yyyy 사가 주최하는 xx 공모전"
        tags={["#발명", "#아이디어", "#창의력"]}
        skillStack={[                
        {number : 1},
        {number : 2},
        {number : 3},
        {number : 4}
      ]}
        prize="100000000"
      />
      <CCard
        participants="20"
        field="1"
        maintitle="xxxx 공모전"
        subtitle="zzz를 위한"
        explan="yyyy 사가 주최하는 xx 공모전"
        tags={["#발명", "#아이디어", "#창의력"]}
        skillStack={[                
          {number : 1},
          {number : 2},
          {number : 3},
          {number : 4}
        ]}
        prize="100000000"
      />
      <CCard
        participants="30"
        field="1"
        maintitle="abcd 공모전"
        subtitle="zzz를 위한"
        explan="yyyy 사가 주최하는 xx 공모전"
        tags={["#발명", "#아이디어", "#창의력"]}
        skillStack={[                
          {number : 1},
          {number : 2},
          {number : 3},
          {number : 4}
        ]}
        prize="100000000"
      />
      <CCard
        participants="300"
        field="1"
        maintitle="xyz 공모전"
        subtitle="zzz를 위한"
        explan="yyyy 사가 주최하는 xx 공모전"
        tags={["#발명", "#아이디어", "#창의력"]}
        skillStack={[                
          {number : 1},
          {number : 2},
          {number : 3},
          {number : 4}
        ]}
        prize="100000000"
      />
      </h2>
      <Button variant="contained">스레드</Button>
      <h2 className={styles.title}>
        <Link href="/contest/create" passHref>
        <Button variant="outlined">공모전 생성</Button>
          </Link>
          <Link href="/contest/update" passHref>
          <Button variant="outlined">공모전 수정</Button>
          </Link>
      </h2>
      <Link href="/">
      <Button variant="contained">메인화면</Button>
      </Link>
      <style jsx>{style}</style>
    </>
  );
}
