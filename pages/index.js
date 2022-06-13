import MainLayout from "../components/Layout/MainLayout";
import { Fragment, useEffect, useState, useCallback } from "react";
import MainSVG from "../svg/main/main_art.svg";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import mainPageStyle from "../styles/jss/nextjs-material-kit/pages/mainPage/mainPage";
import { makeStyles } from "@material-ui/core/styles";
import CompetitionChat from "../components/Visualizations/competitionChat/CompetitionChat";
import { Typography } from "@material-ui/core";
import Card from "../components/Card/Card";
import throttle from "lodash/throttle";
import Parser from "html-react-parser";
import Link from "next/link";
import Treemap from "../components/Visualizations/Treemap/Treemap";
import CommaBlue from "../svg/modal/commaBlue.svg";
import Button from "../components/CustomButtons/Button";
import { useRouter } from "next/router";
const useStyles = makeStyles(mainPageStyle);

const pageLabels = {
  headCopy: `Contest Guider`,
  subCopy: `당신의 여정을 안내해 드리겠습니다.`,
  mainContent: `모든 여정이 행복한 내일로 나아가기를`,
  competition: "경쟁률 현황",
  professtion: "대회 분야 현황",
  button: "대회로 떠나기",
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
const reqProfesstionTreemap = async (index, filed, size) => {
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

const reqProfession = async (name) => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/tags/Profession/${name}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
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
  const [treemapData, setTreemapData] = useState([
    { name: "Origin", parent: "", value: "" },
  ]);
  const [currentProfession, setCurrentProfession] = useState();
  const router = useRouter();
  const classes = useStyles();

  const delayedSearch = useCallback(
    throttle((q) => {
      reqContestInfo(q).then((data) => {
        console.log(data);
        setTopCompetition(data);
      });
    }, 600),
    []
  );
  const delayedTreemap = useCallback(
    throttle((q) => {
      reqProfession(q).then((data) => {
        console.log(data);
        setCurrentProfession(data);
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
    });
    reqProfesstionTreemap("contest_index", "professtion_name.keyword", 0).then(
      (res) => {
        const root = res.map((data) => {
          return {
            name: data.key,
            parent: "Origin",
            value: data.doc_count,
          };
        });
        root.columns = ["name", "parent", "value"];

        setTreemapData([...treemapData, ...root]);
      }
    );
    setLoading(false);
  }, []);

  const handleRank = (data) => {
    delayedSearch(data);
  };
  const handleTreemap = (data) => {
    delayedTreemap(data);
  };
  if (loading) return <div>loading...</div>;
  return (
    <MainLayout>
      <GridContainer className={classes.mainContainer} direction="row">
        <GridItem xs={5} sm={5} md={5} className={classes.mainCopysContainer}>
          <GridContainer direction="column">
            <GridItem className={classes.gridBorder}>
              <CommaBlue
                width={80}
                height={80}
                className={classes.svg + " " + classes.leftSVG}
              />
              <GridItem xs={12} sm={12} md={12}>
                <p className={classes.headCopy}>{headCopy}</p>
              </GridItem>
              <GridItem
                className={classes.subCopyContainer}
                xs={12}
                sm={12}
                md={12}
              >
                <p className={classes.subCopy}>{subCopy}</p>
              </GridItem>
              <GridItem
                className={classes.copyContainer}
                xs={12}
                sm={12}
                md={12}
              >
                <p className={classes.copy}>{content}</p>
              </GridItem>
              <Button
                color={"facebook"}
                onClick={() => {
                  router.push("/contest");
                }}
              >
                {pageLabels.button}
              </Button>
              <CommaBlue
                width={80}
                height={80}
                className={classes.svg + " " + classes.rightSVG}
              />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={5} sm={5} md={5} className={classes.mainArtContainer}>
          <MainSVG />
        </GridItem>
      </GridContainer>
      <GridContainer direction="column" className={classes.mainContainer}>
        <GridItem>
          <Typography className={classes.chartCopy}>
            {pageLabels.competition}
          </Typography>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
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
                      {Parser(
                        topCompetition?.content === undefined ||
                          topCompetition?.content === null
                          ? ""
                          : topCompetition?.content
                      )}
                    </Typography>
                  </Fragment>
                )}
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Typography className={classes.chartCopy}>
            {pageLabels.professtion}
          </Typography>
        </GridItem>

        <GridItem xs={12} sm={12} md={12} className={classes.gridItem}>
          <GridContainer direction="row">
            <GridItem xs={6} sm={6} md={6}>
              <Treemap value={treemapData} handle={handleTreemap}></Treemap>
            </GridItem>
            <GridItem xs={4} sm={4} md={4} className={classes.leftContain}>
              <Card className={classes.professionCard}>
                {currentProfession === undefined ? (
                  ""
                ) : (
                  <Fragment>
                    <Typography className={classes.professionTitle}>
                      {currentProfession.name}
                    </Typography>

                    <Typography className={classes.professionBody}>
                      {Parser(
                        currentProfession?.description === undefined ||
                          currentProfession?.description === null
                          ? ""
                          : currentProfession?.description
                      )}
                    </Typography>
                  </Fragment>
                )}
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </MainLayout>
  );
}
