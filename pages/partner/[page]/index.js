import Link from "next/link";
import Card from "../../../components/CustomCard/Partner/PartnerCard";
import css from "styled-jsx/css";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Paginations from "../../../components/Pagination/Pagination";
import MainLayout from "../../../components/Layout/MainLayout";
import styles from "../../../styles/jss/nextjs-material-kit/components/cardStyle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function CompetitionSearchPage({ data }) {
  const classes = useStyles();

  let usersProfessionData = {
    labels: [],
    datasets: [
      {
        labels: [],
        backgroundColor: [
          '#fbf8cc',
          '#fde4cf',
          '#ffcfd2',
          '#f1c0e8',
          '#cfbaf0',
          '#a3c4f3',
          '#90dbf4',
          '#8eecf5',
          '#98f5e1',
          '#b9fbc0',
          '#fdc5f5',
          '#f7aef8',
          '#b388eb',
          '#8093f1',
          '#72ddf7',
          '#7bf1a8',
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#501800',
        ],
        data: []
      }
    ]
  }

  let i = 0;
  let ii = 0;
  let iii = 0;
  let existence = 0;

  for (; i < data.length; i++) {
    ii = 0;
    for (; ii < data[i].profession.length; ii++) {
      iii = 0;
      existence = 0;
      for (; iii < usersProfessionData.datasets[0].labels.length; iii++) {
        if (usersProfessionData.datasets[0].labels[iii] == data[i].profession[ii].name) {
          usersProfessionData.datasets[0].data[iii] += 1;
          existence = 1;
          break;
        }
      }
      if (existence == 0) {
        usersProfessionData.datasets[0].labels.push(data[i].profession[ii].name);
        usersProfessionData.labels.push(data[i].profession[ii].name);
        usersProfessionData.datasets[0].data.push(1);
      }
    }
  }


  return (
    <MainLayout>
      <GridContainer direction="row" spacing={2}>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer direction="row" spacing={2}>
            <GridItem>
            <Pie
          data={usersProfessionData}
          height="200px"
          width="200px"
          options={{
            maintainAspectRatio: false,
            legend:{
              display:true,
              position:'right'
            },
            plugins: {
              title: {
                display: true,
                text: '유저들의 관련 분야 통계'
              }
            }
          }}
        />
            </GridItem>
          </GridContainer>
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
  return { props: { data } };
}
