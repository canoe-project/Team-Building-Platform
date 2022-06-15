// 배효운

import Link from "next/link";
import Card from "../../../components/CustomCard/Partner/PartnerCard";
import css from "styled-jsx/css";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Paginations from "../../../components/Pagination/Pagination";
import MainLayout from "../../../components/Layout/MainLayout";
import styles from "../../../styles/jss/nextjs-material-kit/components/cardStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function CompetitionSearchPage({data}) {
  const classes = useStyles();

  return (
    <MainLayout>
      <GridContainer direction="row" spacing={2}>
      <GridItem xs={12} sm={12} md={12}>
      <Link href="/dashbord">
      <Button variant="contained">통계</Button>
      </Link>
      </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        </GridItem>
        {data.map((d) => {
          return (
            <GridItem key={d.id} xs={12} sm={12} md={12}>
              <Card contestID={d} />
            </GridItem>
          );
        })}
      </GridContainer>
      <Paginations />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;
  const data = await fetch(
    `${process.env.HOSTNAME}/api/partner/${page}?take=${16}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  return { props: { data }};
}
