import MainLayout from "../components/Layout/MainLayout";
import { useEffect, useState } from "react";
import MainSVG from "../svg/main/main_art.svg";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import mainPageStyle from "../styles/jss/nextjs-material-kit/pages/mainPage/mainPage";
import { makeStyles } from "@material-ui/core/styles";
import CompetitionChat from "../components/Visualizations/competitionChat/CompetitionChat";
import { Button } from "@material-ui/core";
const useStyles = makeStyles(mainPageStyle);

const pageLabels = {
  headCopy: `Contest Guider`,
  subCopy: `여정의 안내자`,
  mainContent: `모든이의 여정이 부디 행복한 내일로 나아가기를`,
};

const index = "team_index";

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

export default function MainPage() {
  const [headCopy, setHeadCopy] = useState("");
  const [subCopy, setSubCopy] = useState("");
  const [content, setContentCopy] = useState("");
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState([]);
  const [competitionRank, setCompetitionRank] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    Promise.all([
      setHeadCopy(pageLabels.headCopy),
      setSubCopy(pageLabels.subCopy),
      setContentCopy(pageLabels.mainContent),
    ]);

    reqCompetition(index, "A", 0).then((data) => {
      setCompetition(data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {}, [competitionRank]);
  const handleRank = (data) => {
    setCompetitionRank(data);
  };

  const handleCompetitionSelector = () => {
    if (competition.length > competitionRank) {
      console.log(competition[competitionRank]);
    }
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
        <GridItem xs={8} sm={8} md={8}>
          <CompetitionChat
            handle={handleRank}
            className={classes.chatContainer}
          />
        </GridItem>
        <Button onClick={handleCompetitionSelector}></Button>
      </GridContainer>
    </MainLayout>
  );
}
