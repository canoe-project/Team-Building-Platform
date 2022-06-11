import ContestCard from "../../../components/CustomCard/Contest/ContestCard";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import React, { useEffect, useState } from "react";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Paginations from "../../../components/Pagination/Pagination";
import MainLayout from "../../../components/Layout/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import FilrerContainer from "../../../components/Article/PageFiler/FilerContain";
import FilterMenuItem from "../../../components/Article/PageFiler/FilterMenuItem";
import FilterToggleItem from "../../../components/Article/PageFiler/FilterToggleItem";
import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import palettes from "../../../styles/nextjs-material-kit/palettes";
// import FilterToggleItem from "../../../components/Article/PageFiler/FilterToggleItem";

import Button from "../../../components/CustomButtons/Button";

const pageLabels = {
  professionFilter: "분야",
  contestCreateButtonLabel: "대회 생성 하기",
  ascending: "오름차순",
  dscending: "내림차순",
};

const styled = {
  listItem: {
    paddingLeft: "4rem",
    paddingRight: "4rem",
    paddingBottom: "4rem",
  },
  createCard: {
    height: "20rem",
  },
  createCardButton: {
    right: "1rem",
    bottom: "1rem",
    position: "absolute",
  },
  listItem: {
    padding: "4rem",
  },
  createButton: {
    position: "fixed",
    top: "85%",
    left: "93%",
    boxShadow:
      "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
  },
  buttonIcon: {
    width: "2.5rem",
    height: "2.5rem",
  },
};

const useStyles = makeStyles(styled);

export default function CompetitionSearchPage({ data, maxPage, profession }) {
  const classes = useStyles(useStyles);
  const router = useRouter();
  const [currentProfession, setProfession] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(router.query.page, setLoading(false));
  }, []);
  useEffect(() => {
    router.push(
      `/contest/${currentPage}?${
        router.query.currentProfession !== undefined
          ? `&currentProfession=${router.query.currentProfession}`
          : ""
      }${router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""}
      ${router.query.sort !== undefined ? `&sort=${router.query.sort}` : ""}`
    );
  }, [currentPage]);

  useEffect(() => {
    if (currentProfession !== undefined) {
      router.push(`/contest/1?currentProfession=${currentProfession}${
        router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""
      }
      ${router.query.sort !== undefined ? `&sort=${router.query.sort}` : ""}`);
    }
  }, [currentProfession]);

  useEffect(() => {
    if (sort !== undefined) {
      router.push(`/contest/1?${
        router.query.currentProfession !== undefined
          ? `&currentProfession=${router.query.currentProfession}`
          : ""
      }${router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""}
      ${sort !== undefined ? `&sort=${sort}` : ""}`);
    }
  }, [sort]);

  const handlecontestCreate = () => {
    router.push(`/contest/create`);
  };
  const handleSort = (sort) => {
    setSort(sort === true ? "asc" : "desc");
  };

  const handelPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMenuClick = (profession) => {
    setProfession(profession);
  };
  if (loading) return <div>Loading</div>;
  return (
    <MainLayout>
      <GridContainer direction="column">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.createCard}>
            <CardFooter>
              <Button
                className={classes.createCardButton}
                onClick={() => {
                  handlecontestCreate();
                }}
              >
                {pageLabels.contestCreateButtonLabel}
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FilrerContainer>
            <FilterMenuItem
              items={profession}
              label={pageLabels.professionFilter}
              handleMenuClick={handleMenuClick}
            />
            <FilterToggleItem
              label={pageLabels.ascending}
              clickLabel={pageLabels.dscending}
              handleToggleClick={handleSort}
            ></FilterToggleItem>
          </FilrerContainer>
        </GridItem>
        <GridContainer direction="row">
          {data.map((d) => {
            return (
              <GridItem
                key={d.article_id}
                xs={4}
                sm={4}
                md={4}
                className={classes.listItem}
              >
                <ContestCard contestID={d.article_id} />
              </GridItem>
            );
          })}
        </GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer direction="row" justifyContent="center">
            <Paginations
              currentPage={currentPage}
              MaxPage={maxPage}
              handel={handelPageChange}
            />
          </GridContainer>
        </GridItem>
      </GridContainer>
      <IconButton
        className={classes.createButton}
        onClick={() => {
          handlecontestCreate();
        }}
      >
        <AddIcon
          sx={{ fontSize: "2rem" }}
          style={{ color: palettes.darkBlue3 }}
        />
      </IconButton>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { page, currentProfession, tag, sort } = context.query;

  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/${page}?take=${12}${
      currentProfession !== undefined
        ? `&currentProfession=${currentProfession}`
        : ""
    }${tag !== undefined ? `&tag=${tag}` : ""}
    ${sort !== undefined ? `&sort=${sort}` : ""}
    `,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });

  const maxPage = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest?${
      currentProfession !== undefined
        ? `&currentProfession=${currentProfession}`
        : ""
    }${tag !== undefined ? `&tag=${tag}` : ""}
    ${sort !== undefined ? `&sort=${sort}` : ""}
    `,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });

  const profession = await fetch(
    `${process.env.HOSTNAME}/api/tags/profession`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });

  return { props: { data, maxPage, profession } };
}
