/*
정도현
*/

import { useState, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton } from "@material-ui/core/";
//components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import CommonTag from "../../../components/Tags/CommonTag/CommonTag";
import TagRoot from "../../../components/Tags/TagRoot";
import Card from "../../../components/Card/Card";
import ProfessionsLabel from "../../../components/Tags/Professions/ProfessionsLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GradeIcon from "@mui/icons-material/Grade";

import Treasure from "../../../svg/contest/Treasure.svg";
import moment from "moment";
import Parser from "html-react-parser";
import Fade from "@mui/material/Fade";
import SectionComments from "../../comment/SectionComments";
import styles from "../../../styles/jss/nextjs-material-kit/pages/overview/contestOverview";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModalTag from "../../../components/Tags/ModalTag/ModalTag";

const pageLabels = {
  edittingButton: "수정",
  deleteButton: "삭제",
  contestOverview: "대회",
  contestName: "대회 이름",
  contestCentent: "대회 개요",
  contestPrize: "상금",
  contestPeriod: "대회 기간",
  contestTechStack: "기술 스택",
  prize: "원",
  content: "대회 상세 내용",
};

const reqDelete = async (id) => {
  const result = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/DELETE/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  return result;
};

const customStyles = makeStyles(styles);
const Overview = ({ article, contest, professions, handleEditing }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const classes = customStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const reqTag = (tagName) => {
    if (tagName !== undefined) {
      router.push(`/contest/1?tag=${tagName}`);
    }
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <GridContainer direction="column" spacing={3}>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer direction="row">
          <GridItem xs={1} sm={1} md={1}>
            <ProfessionsLabel data={professions} />
          </GridItem>
          <GridItem className={classes.titleContain} xs={9} sm={9} md={9}>
            <GridContainer direction="column">
              <GridItem>
                <Typography className={classes.title}>
                  {article.content.title}
                </Typography>
              </GridItem>
              <GridItem>
                <Typography>
                  {moment(article.createdAt).format("YYYY.MM.DD")}
                </Typography>
              </GridItem>
              <GridItem>
                <TagRoot>
                  {contest.Tag.map((tag) => {
                    return <CommonTag name={tag.name} handle={reqTag} />;
                  })}
                </TagRoot>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={1} sm={1} md={1} className={classes.edidorContainer}>
            <IconButton
              onClickCapture={() => {
                handleEditing();
              }}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              onClickCapture={() => {
                reqDelete(router.query.id);
                router.push("/contest");
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </GridItem>
          <GridItem>
            <GridContainer direction="row-reverse" justifyContent="flex-start">
              <GridItem xs={1} sm={1} md={1}>
                <VisibilityIcon className={classes.icon} />
                <Typography>{article.viewCount}</Typography>
                <GradeIcon className={classes.icon} />
                <Typography>{article.likeCount}</Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <GridContainer direction="row" spacing={3}>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  className={classes.overviewItem + " " + classes.borderRight}
                >
                  <GridContainer direction="column">
                    <GridItem className={classes.subTitle}>
                      {pageLabels.contestOverview}
                    </GridItem>
                    <Typography className={classes.subTitle2}>
                      {pageLabels.contestName}
                    </Typography>
                    <GridItem>
                      <Typography className={classes.overviewBody}>
                        {contest.name}
                      </Typography>
                    </GridItem>
                    <Typography className={classes.subTitle2}>
                      {pageLabels.contestCentent}
                    </Typography>
                    <GridItem className={classes.overviewBody}>
                      <Typography className={classes.overviewBody}>
                        <div>{Parser(contest.content)}</div>
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  className={classes.overviewItem + " " + classes.borderRight}
                >
                  <GridContainer direction="column">
                    <GridItem className={classes.subTitle}>
                      {pageLabels.contestPeriod}
                    </GridItem>
                    <GridItem className={classes.overviewBody}>
                      <Typography className={classes.overviewBody}>
                        {`${moment(contest.start_period).format(
                          "YYYY.MM.DD"
                        )}~ ${moment(contest.end_period).format("YYYY.MM.DD")}`}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  className={classes.overviewItem + " " + classes.borderRight}
                >
                  <GridContainer direction="column">
                    <GridItem className={classes.subTitle}>
                      <Typography>{pageLabels.contestPrize}</Typography>
                    </GridItem>
                    <GridItem>
                      <Treasure className={classes.icon} />
                      <Typography className={classes.overviewBody}>
                        {contest.prize}
                        {pageLabels.prize}
                      </Typography>
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <GridItem xs={3} sm={3} md={3} className={classes.overviewItem}>
                  <GridContainer direction="column">
                    <GridItem className={classes.subTitle}>
                      {pageLabels.contestTechStack}
                    </GridItem>
                    <GridItem className={classes.overviewBody}>
                      <TagRoot>
                        {contest.tech_stack.map((stack, index) => {
                          return (
                            <ModalTag
                              name={stack.name}
                              image={stack.image_url}
                              description={stack.description}
                              key={index}
                            ></ModalTag>
                          );
                        })}
                      </TagRoot>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.card + " " + classes.bodyCard}>
          <Typography className={classes.subTitle}>
            {pageLabels.content}
          </Typography>
          <Typography className={classes.body}>
            {Parser(article.content.body)}
          </Typography>
        </Card>
      </GridItem>
      <GridItem>
        <SectionComments className={classes.comment} />
      </GridItem>
    </GridContainer>
  );
};

export default Overview;
