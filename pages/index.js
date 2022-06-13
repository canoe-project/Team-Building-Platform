import MainLayout from "../components/Layout/MainLayout";
import { Fragment, useEffect, useState, useCallback } from "react";
import MainSVG from "../svg/main/main_art.svg";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import mainPageStyle from "../styles/jss/nextjs-material-kit/pages/mainPage/mainPage";
import { makeStyles } from "@material-ui/core/styles";
import CompetitionChat from "../components/Visualizations/competitionChat/CompetitionChat";
import { Button, Typography } from "@material-ui/core";
import Card from "../components/Card/Card";
import throttle from "lodash/throttle";
import Parser from "html-react-parser";
import Link from "next/link";

const useStyles = makeStyles(mainPageStyle);

const pageLabels = {
  headCopy: `Contest Guider`,
  subCopy: `여정의 안내자`,
  mainContent: `모든이의 여정이 부디 행복한 내일로 나아가기를`,
};

const index = "team_index";
const size = 10;
const reqCompetition = async (index, filed, size) => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/search/groupBy?index=${index}&filed=${filed}&size=${size}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });

  return data;
};

const reqContestInfo = async (id) => {
  const data = await fetch(`${process.env.HOSTNAME}/api/contest?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });

  return data;
};

export default function MainPage() {
  const [headCopy, setHeadCopy] = useState("");
  const [subCopy, setSubCopy] = useState("");
  const [content, setContentCopy] = useState("");
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState([]);
  const [topCompetition, setTopCompetition] = useState({
    id: 0,
    name: "",
    prize: 0,
    content: "",
    end_period: "",
    start_period: "",
    createAt: "",
    contest_article: [
      {
        article_id: 0,
      },
    ],
  });
  const classes = useStyles();

  const delayedSearch = useCallback(
    throttle((q) => {
      reqContestInfo(q).then((data) => {
        setTopCompetition(data);
      });
    }, 600),
    []
  );

  useEffect(() => {
    Promise.all([
      setHeadCopy(pageLabels.headCopy),
      setSubCopy(pageLabels.subCopy),
      setContentCopy(pageLabels.mainContent),
    ]);

    reqCompetition(index, "A", size).then(async (data) => {
      setCompetition(data);
      setLoading(false);
    });
  }, []);

  const handleRank = (data) => {
    delayedSearch(data);
  };

  if (loading) return <div>loading...</div>;
  return (
    <MainLayout>
      <GridContainer className={classes.mainContainer} direction="row">
        <GridItem xs={5} sm={5} md={5} className={classes.mainCopysContainer}>
          <GridContainer direction="column">
            <GridItem>
              <p className={classes.headCopy}>{headCopy}</p>
            </GridItem>
            <GridItem className={classes.subCopyContainer}>
              <p className={classes.subCopy}>{subCopy}</p>
            </GridItem>
            <GridItem className={classes.copyContainer}>
              <p className={classes.copy}>{content}</p>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={5} sm={5} md={5} className={classes.mainArtContainer}>
          <MainSVG />
        </GridItem>
      </GridContainer>
      <GridContainer direction="row">
        <GridItem xs={9} sm={9} md={9}>
          <CompetitionChat
            handle={handleRank}
            className={classes.chatContainer}
            value={competition}
          />
        </GridItem>
        <GridItem xs={3} sm={3} md={3} className={classes.leftContain}>
          <Card className={classes.competitionCard}>
            {topCompetition === undefined ? (
              ""
            ) : (
              <Fragment>
                <Link
                  href={`${process.env.HOSTNAME}/contest/passToArticle?id=${topCompetition.id}`}
                  passHref
                >
                  <Typography className={classes.competitionTitle}>
                    {topCompetition.name}
                  </Typography>
                </Link>
                <Typography className={classes.competitionBody}>
                  {Parser(topCompetition.content)}
                </Typography>
              </Fragment>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </MainLayout>
  );
}
