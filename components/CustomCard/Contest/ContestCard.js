import React, { Fragment, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@mui/material";
import TagContainer from "../../Tags/TagsContainer";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Link from "next/link";
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import CardFooter from "../../Card/CardFooter";
import CardHeader from "../../Card/CardHeader";
import ProfessionsLabel from "../../Tags/Professions/ProfessionsLabel";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Treasure from "../../../svg/contest/treasure.svg";
import Parser from "html-react-parser";
import moment from "moment";

import CommonTag from "../../Tags/commonTag/CommonTag";
import TagRoot from "../../Tags/TagRoot";
import { useRouter } from "next/router";

const pageLabels = {
  contestBodyLabel: "개요",
  techStackLabel: "기술 스택",
  prize: "원",
};

const styles = {
  card: {
    width: "100%",
    justifyContent: "center",
    height: "auto",
  },
  image: {
    width: "100%",
    height: "12.5rem",
    objectFit: "cover",
    objectPosition: "center",
  },
  icon: {
    height: "3rem",
  },
  tags: {
    marginBottom: "0.5rem",
  },
  cardHeader: {
    marginTop: "2rem",
  },
  cardBody: {
    pagging: "2rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: "1.25rem",
    fontFamily: "SCDream3",
  },
  subTitle: {
    marginTop: "1rem",
    marginBottom: "1rem",
    fontFamily: "SCDream4",
    fontWeight: "bold",
  },
  title: {
    fontFamily: "SCDream6",
    fontSize: "1.5rem",
  },
  body: {
    height: "6rem",
    overflowY: "scroll",
    overflowX: "hidden",
    fontSize: "1rem",
    color: "#98A8B9",
  },
  prize: { display: "flex", placeContent: "flex-end" },
  cardFooter: {
    marginTop: "auto",
    fontSize: "1rem",
    color: "#98A8B9",
    alignItems: "flex-end",
    borderTop: "0.0625rem solid #D7E2EB",
    height: "5rem",
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
  },
};

const useStyles = makeStyles(styles);

const ContestCard = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const { contestID, className } = props;

  const [contest, setContest] = useState({});
  const [loading, setLoading] = React.useState(true);

  const contestRequest = async (contestID) => {
    const data = await fetch(
      `${process.env.HOSTNAME}/api/article/Contest/page/${contestID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (response) => {
      return await response.json();
    });

    setContest(data);
  };

  useEffect(() => {
    contestRequest(contestID).then(() => {
      setLoading(false);
    });
  }, []);
  const reqTag = (tagName) => {
    if (tagName !== undefined) {
      router.push(`/contest/1?tag=${tagName}`);
    }
  };
  if (loading) return <Fragment>Loading...</Fragment>;
  return (
    <Fragment>
      <CssBaseline />
      <Card className={classes.card + " " + className}>
        <CardHeader>
          <Link
            href={`${process.env.HOSTNAME}/contest/Read/${contest.id}`}
            passHref
          >
            <CardActionArea>
              <img
                src={
                  contest.constest_image_url !== null
                    ? `${contest.constest_image_url}`
                    : `/asset/image/background/contest/default.svg`
                }
                alt="green iguana"
                className={classes.image}
              />
            </CardActionArea>
          </Link>
          <GridContainer direction="row" className={classes.cardHeader}>
            <GridItem xs={3} sm={3} md={3}>
              <ProfessionsLabel data={contest.contest.profession} />
            </GridItem>
            <GridItem xs={8} sm={8} md={8}>
              <Box>
                <Link
                  href={`${process.env.HOSTNAME}/contest/Read/${contest.id}`}
                  passHref
                >
                  <Typography className={classes.title}>
                    {contest.article.content.title}
                  </Typography>
                </Link>
                <p>
                  {moment(contest.contest.start_period).format("YYYY.MM.DD")}~
                  {moment(contest.contest.end_period).format("YYYY.MM.DD")}
                </p>
              </Box>
            </GridItem>
            <TagRoot>
              {contest.contest.Tag.map((tag) => {
                return <CommonTag name={tag.name} handle={reqTag}></CommonTag>;
              })}
            </TagRoot>
          </GridContainer>
          {/* contest.contest.Tag */}
        </CardHeader>

        <CardBody className={classes.cardBody}>
          <CardContent className={classes.cardBody}>
            <Box className={classes.subTitle}>
              <p>{pageLabels.contestBodyLabel}</p>
            </Box>
            {/* <Typography>{contest.contest.team.length}명 </Typography> */}
            <Box className={classes.body}>
              <p>{Parser(contest.article.content.body)}</p>
            </Box>
            <Box className={classes.subTitle}>
              <p>{pageLabels.techStackLabel}</p>
            </Box>
            <TagContainer
              tags={contest.contest.tech_stack}
              type="TechStack"
              form="icon"
            />
          </CardContent>
        </CardBody>

        <CardFooter className={classes.cardFooter}>
          <GridContainer direction="row" className={classes.footerContainer}>
            <GridItem xs={4} sm={4} md={4}>
              <Treasure className={classes.icon} />
            </GridItem>
            <GridItem xs={8} sm={8} md={8} className={classes.prize}>
              <p>{`${contest.contest.prize}${pageLabels.prize}`}</p>
            </GridItem>
          </GridContainer>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default ContestCard;
