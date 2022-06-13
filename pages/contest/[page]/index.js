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
import { Chip, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import palettes from "../../../styles/nextjs-material-kit/palettes";
// import FilterToggleItem from "../../../components/Article/PageFiler/FilterToggleItem";
import TagRoot from "../../../components/Tags/TagRoot";
import CommonTag from "../../../components/Tags/CommonTag/CommonTag";
import Button from "../../../components/CustomButtons/Button";
import Searcher from "../../../components/Tags/Searcher/Search";
import ProfessionsItem from "../../../components/Tags/Searcher/SearcherItem/ProfessionsItem";
import SearchChip from "../../../components/Tags/Searcher/SearcherButton/SearchChip";

import ContestArt from "../../../svg/contest/contestArt.svg";
import { set } from "date-fns";
const pageLabels = {
  professionFilter: "분야",
  contestCreateButtonLabel: "대회 생성 하기",
  ascending: "최신순",
  dscending: "과거순",
  highPrice: "상금순",
  lowPrice: "낮은 가격순",
  topTag: "인기 태그",
  headCopy: "대회",
  subCopy: "새로운 여정을 찾아보세요!",
};

const styled = {
  listItem: {
    paddingLeft: "4rem",
    paddingRight: "4rem",
    paddingBottom: "4rem",
  },
  createCard: {
    padding: "2.5rem",
  },
  headerCardFooter: {
    marginTop: "auto",
  },
  createCardButton: {
    right: "1rem",
    bottom: "1rem",
    position: "absolute",

    backgroundColor: palettes.darkBlue2,
    "&:hover": {
      background: palettes.lightBlue,
    },
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
  filterGridItem: {
    flexDirection: "row-reverse",
  },
  art: {
    position: "absolute",
    right: "1rem",
  },
  headCopy: {
    color: palettes.darkBlue2,
    fontFamily: "Do Hyeon",
    fontSize: "2.5rem",
  },
  subCopyContainer: {},
  subCopy: {
    color: palettes.darkBlue,
    fontFamily: "Do Hyeon",
    fontSize: "1.25rem",
    maxWidth: "80%",
  },
  copy: {
    marginTop: "2rem",
    fontSize: "1.125rem",
    fontFamily: "SCDream4",
    fontWeight: "bold",
    fontSize: "1.125rem",
  },
};

const useStyles = makeStyles(styled);

const reqTagDescription = async (tagName) => {
  const tag = await fetch(`${process.env.HOSTNAME}/api/tags/Tag/${tagName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    return await response.json();
  });
  console.log(tag.description);
  return tag.description;
};

export default function CompetitionSearchPage({
  data,
  maxPage,
  profession,
  topTag,
}) {
  const classes = useStyles(useStyles);
  const router = useRouter();
  const [currentProfession, setProfession] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(undefined);
  const [prize, setPrize] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(undefined);
  useEffect(() => {
    setTag(router.query.tag);
    setCurrentPage(router.query.page, setLoading(false));
  }, []);

  useEffect(() => {
    router.push(
      `/contest/${currentPage}?` +
        `${
          router.query.currentProfession !== undefined
            ? `&currentProfession=${router.query.currentProfession}`
            : ""
        }` +
        `${router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""}` +
        `${
          router.query.sort !== undefined ? `&sort=${router.query.sort}` : ""
        }` +
        ` ${
          router.query.prize !== undefined ? `&prize=${router.query.prize}` : ""
        }`
    );
  }, [currentPage]);

  useEffect(() => {
    if (currentProfession !== undefined) {
      router.push(
        `/contest/1?` +
          `${
            currentProfession !== undefined
              ? `&currentProfession=${currentProfession}`
              : ""
          }` +
          `${
            router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""
          }` +
          `${
            router.query.sort !== undefined ? `&sort=${router.query.sort}` : ""
          }` +
          `${
            router.query.prize !== undefined
              ? `&prize=${router.query.prize}`
              : ""
          }`
      );
    }
  }, [currentProfession]);

  useEffect(() => {
    if (sort !== undefined) {
      router.push(
        `/contest/1?` +
          `${
            router.query.currentProfession !== undefined
              ? `&currentProfession=${router.query.currentProfession}`
              : ""
          }` +
          `${
            router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""
          }` +
          `${sort !== undefined ? `&sort=${sort}` : ""}` +
          `${
            router.query.prize !== undefined
              ? `&prize=${router.query.prize}`
              : ""
          }`
      );
    }
  }, [sort]);
  useEffect(() => {
    router.push(
      `/contest/1?` +
        `${
          router.query.currentProfession !== undefined
            ? `&currentProfession=${router.query.currentProfession}`
            : ""
        }` +
        `${router.query.tag !== undefined ? `&tag=${router.query.tag}` : ""}` +
        `${
          router.query.sort !== undefined ? `&sort=${router.query.sort}` : ""
        }` +
        `${prize !== undefined ? `&prize=${prize}` : ""}`
    );
  }, [prize]);

  useEffect(() => {
    if (tag !== undefined) {
      reqTagDescription(tag).then((data) => {
        setDescription(data);
      });
    }
  }, [tag]);

  const handlecontestCreate = () => {
    router.push(`/contest/create`);
  };
  const handleSort = (data) => {
    setSort(data === true ? "asc" : "desc");
  };

  const handlePrize = (data) => {
    setPrize(data === true ? "desc" : undefined);
  };

  const handelPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMenuClick = (profession) => {
    setProfession(profession.name);
  };
  const reqTag = (tagName) => {
    if (tagName !== undefined) {
      setTag(tagName);
      router.push(`/contest/1?tag=${tagName}`);
    }
  };
  if (loading) return <div>Loading</div>;
  return (
    <MainLayout>
      <GridContainer direction="column">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.createCard}>
            <ContestArt className={classes.art} width={300} height={240} />
            <CardBody className={classes.subCopyContainer}>
              <Typography className={classes.headCopy}>
                {tag === undefined ? pageLabels.headCopy : tag}
              </Typography>
              <Typography className={classes.subCopy}>
                {tag === undefined ? pageLabels.subCopy : description}
              </Typography>
              <Typography className={classes.copy}>
                {pageLabels.topTag}
              </Typography>
              <TagRoot>
                {topTag.map((tag, index) => {
                  return (
                    <CommonTag
                      key={index}
                      name={tag.name}
                      handle={reqTag}
                    ></CommonTag>
                  );
                })}
              </TagRoot>
            </CardBody>
            <CardFooter className={classes.headerCardFooter}>
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
        <GridItem xs={12} sm={12} md={12} className={classes.filterGridItem}>
          <FilrerContainer>
            <Searcher
              index={"professtion_index"}
              filed={["name", "description", "type"]}
              basicQuery={"professtion"}
              size={24}
              direction={"row"}
              modalLabel={"분야 생성"}
              button={<SearchChip label={pageLabels.professionFilter} />}
              handle={handleMenuClick}
            >
              <ProfessionsItem></ProfessionsItem>
            </Searcher>
            <FilterToggleItem
              label={pageLabels.ascending}
              clickLabel={pageLabels.dscending}
              handleToggleClick={handleSort}
            ></FilterToggleItem>
            <FilterToggleItem
              label={pageLabels.highPrice}
              clickLabel={pageLabels.highPrice}
              handleToggleClick={handlePrize}
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
  const { page, currentProfession, tag, sort, prize } = context.query;

  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/${page}?take=${12}` +
      `${
        currentProfession !== undefined
          ? `&currentProfession=${currentProfession}`
          : ""
      }` +
      `${tag !== undefined ? `&tag=${tag}` : ""}` +
      `${sort !== undefined ? `&sort=${sort}` : ""}` +
      `${prize !== undefined ? `&prize=${prize}` : ""}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });

  const maxPage = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest?` +
      `${
        currentProfession !== undefined
          ? `&currentProfession=${currentProfession}`
          : ""
      }` +
      `${tag !== undefined ? `&tag=${tag}` : ""}` +
      `${sort !== undefined ? `&sort=${sort}` : ""}` +
      `${prize !== undefined ? `&prize=${prize}` : ""}`,
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

  const topTag = await fetch(`${process.env.HOSTNAME}/api/tags/contestTopTag`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    return await response.json();
  });

  return { props: { data, maxPage, profession, topTag } };
}
