// 배효운

import Link from "next/link";
import css from "styled-jsx/css";
import React, { useEffect, useState } from "react";
import { Pie, Bar, PolarArea } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart } from "react-google-charts";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Paginations from "../../components/Pagination/Pagination";
import MainLayout from "../../components/Layout/MainLayout";
import styles from "../../styles/jss/nextjs-material-kit/components/cardStyle";
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

  let usersAttentionProfessionData = {
    labels: [],
    datasets: [
      {
        backgroundColor: [
          '#d9ed92',
          '#b5e48c',
          '#99d98c',
          '#76c893',
          '#52b69a',
          '#34a0a4',
          '#168aad',
          '#1a759f',
          '#1e6091',
          '#184e77',
          '#002855',
          '#001845',
          '#001233',
          '#33415c',
          '#5c677d',
          '#7d8597',
        ],
        data: [],
        fill: true,
        borderWidth: 1,
      }
    ]
  }

  let usersTechStackData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#606c38',
          '#283618',
          '#fefae0',
          '#dda15e',
          '#bc6c25',
          '#cdb4db',
          '#ffc8dd',
          '#ffafcc',
          '#bde0fe',
          '#a2d2ff',
          '#ffbe0b',
          '#fb5607',
          '#ff006e',
          '#8338ec',
          '#3a86ff',
          '#000000',
          '#14213d',
          '#fca311',
          '#e5e5e5',
          '#edede9',
          '#d6ccc2',
          '#f5ebe0',
          '#e3d5ca',
          '#d5bdaf',
        ],
        borderWidth: 1,
      },
    ],
  };

  let usersProgramData = [
    ["프로그램", "활용가능한 인원수"],
  ];

  let usersProgramDataOptions = {
    title: "유저들의 활용 가능한 프로그램 통계",
    chartArea: { width: "50%" },
    hAxis: {
      title: "활용 가능한 인원수",
      minValue: 0,
    },
    vAxis: {
      title: "프로그램",
    },
  };

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

  i = 0;
  ii = 0;
  iii = 0;
  existence = 0;
  
  for (; i < data.length; i++) {
    ii = 0;
    if (data[i].user_attention_profession.length !== 0) {
      for (; ii < data[i].user_attention_profession[0].profession.length; ii++) {
        iii = 0;
        existence = 0;
        for (; iii < usersAttentionProfessionData.labels.length; iii++) {
          if (usersAttentionProfessionData.labels[iii] == data[i].user_attention_profession[0].profession[ii].name) {
            usersAttentionProfessionData.datasets[0].data[iii] += 1;
            existence = 1;
            break;
          }
        }
        if (existence == 0) {
         
          usersAttentionProfessionData.labels.push(data[i].user_attention_profession[0].profession[ii].name);
          usersAttentionProfessionData.datasets[0].data.push(1);
        }
      }
    }
  }

  i = 0;
  ii = 0;
  iii = 0;
  existence = 0;

  for (; i < data.length; i++) {
    ii = 0;
    for (; ii < data[i].tech_stack.length; ii++) {
      iii = 0;
      existence = 0;
      for (; iii < usersTechStackData.labels.length; iii++) {
        if (usersTechStackData.labels[iii] == data[i].tech_stack[ii].name) {
          usersTechStackData.datasets[0].data[iii] += 1;
          existence = 1;
          break;
        }
      }
      if (existence == 0) {
        usersTechStackData.labels.push(data[i].tech_stack[ii].name);
        usersTechStackData.datasets[0].data.push(1);
      }
    }
  }

  i = 0;
  ii = 0;
  iii = 0;
  existence = 0;

  for (; i < data.length; i++) {
    ii = 0;
    if (data[i].program.length !== 0) {
      for (; ii < data[i].program.length; ii++) {
        iii = 0;
        existence = 0;
        for (; iii < usersProgramData.length - 1; iii++) {
          if (usersProgramData[iii + 1][0] == data[i].program[ii].name) {
            usersProgramData[iii + 1][1] += 1;
            existence = 1;
            break;
          }
        }
        if (existence == 0) {
          usersProgramData.push([data[i].tech_stack[ii].name, 1]);
        }
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

            plugins: {
              title: {
                display: true,
                text: '유저들의 관련 분야 통계'
              },
            }
          }}
        />
            </GridItem>
            <GridItem>
            <Bar
        data={usersAttentionProfessionData}
        height="200px"
        width="200px"
        options={{
          maintainAspectRatio: false,

          plugins: {
            title: {
              display: true,
              text: '유저들의 관심있는 분야 통계'
            },
            legend: {
              display: false,
            },
          }
        }}
      />
            </GridItem>
            <GridItem>
            <PolarArea 
            data={usersTechStackData}
            height="300px"
            width="300px"
            options={{
              maintainAspectRatio: false,
  
              plugins: {
                title: {
                  display: true,
                  text: '유저들의 기술 스택 통계'
                },
              }
            }} 
            />
            </GridItem>
            <GridItem>
            <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={usersProgramData}
      options={usersProgramDataOptions}
    />
    </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/partner/1?take=${16}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  return { props: { data } };
}