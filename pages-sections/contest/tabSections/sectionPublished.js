import { useState, useEffect, useReducer, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

//components
import GridContainer from "../../../components/Grid/GridContainer";

import GridItem from "../../../components/Grid/GridItem";
import TitleInput from "../../../components/Input/Title";
import Card from "../../../components/Card/Card";
import ProfessionsLabel from "../../../components/Tags/Professions/ProfessionsLabel";
import Editor from "../../../components/Editors/CKEditorTextEditor";
import Treasure from "../../../svg/contest/Treasure.svg";
import moment from "moment";
import styles from "../../../styles/jss/nextjs-material-kit/pages/overview/contestOverview";
import { Typography, TextField, IconButton } from "@material-ui/core";
import TimePicker from "../../../components/TimePicker/TimePicker";

import Searcher from "../../../components/Tags/Searcher/Search";
import TechStackItem from "../../../components/Tags/Searcher/SearcherItem/TechStackItem";
import TechStackCard from "../../../components/CustomCard/TechStack/TechStakCard";
import ProfessionsItem from "../../../components/Tags/Searcher/SearcherItem/ProfessionsItem";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import palettes from "../../../styles/nextjs-material-kit/palettes";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/router";
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

const articleOtion = {
  published: false,
  createdAt: moment().toISOString(),
  updatedAt: moment().toISOString(),
  viewCount: 0,
  likeCount: 0,
  id: 0,
  content: {
    id: 0,
    article_id: 0,
    title: "",
    body: "",
    createdAt: moment().toISOString(),
  },
};
const contestOption = {
  id: 0,
  name: "",
  prize: 0,
  content: "",
  end_period: moment().toISOString(),
  start_period: moment().toISOString(),
  createAt: moment().toISOString(),
  team: [],
  Tag: [],
  tech_stack: [],
  profession: [{}],
};
const articleReducer = (prevState, action) => {
  switch (action.type) {
    case "init":
      return { ...action.result };
    case "contentTitle":
      return {
        ...prevState,
        content: {
          ...prevState.content,
          title: action.result,
        },
      };
    case "contentBody":
      return {
        ...prevState,
        content: {
          ...prevState.content,
          body: action.result,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const contestReducer = (prevState, action) => {
  switch (action.type) {
    case "init":
      return { ...action.result };
    case "contestTitle":
      return {
        ...prevState,
        name: action.result,
      };
    case "contestPrize":
      return {
        ...prevState,
        prize: parseInt(action.result),
      };
    case "contestContent":
      return {
        ...prevState,
        content: action.result,
      };
    case "contestEndPeriod":
      return {
        ...prevState,
        end_period: moment(action.result).toISOString(),
      };
    case "contestStartPeriod":
      return {
        ...prevState,
        start_period: moment(action.result).toISOString(),
      };
    case "contestTag":
      return {
        ...prevState,
        Tag: [...prevState.Tag, { name: action.result }],
      };
    case "contestTechStack":
      return {
        ...prevState,
        tech_stack: [...prevState.tech_stack, action.result],
      };
    case "contestProfession":
      return {
        ...prevState,
        profession: { ...action.result },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const reqUpdate = async (article, contest, techStack, professtion, id) => {
  const init = {
    contest: {
      update: {
        tech_stack: {
          set: [],
        },
      },
    },
    include: {
      contest: {
        tech_stack: true,
      },
    },
  };
  const body = {
    article: {
      update: {
        published: true,
        updatedAt: moment().toISOString(),
        viewCount: 0,
        likeCount: 0,
        content: {
          update: {
            title: article.content.title,
            body: article.content.body,
          },
        },
      },
    },
    contest: {
      update: {
        name: contest.name,
        prize: contest.prize,
        content: contest.content,
        end_period: contest.end_period,
        start_period: contest.start_period,
        createAt: contest.createAt,
        ...(contest.Tag[0] !== undefined && {
          Tag: {
            connectOrCreate: contest.Tag.map((t) => {
              return {
                where: {
                  name: t.name,
                },
                create: {
                  name: t.name,
                  description: "",
                  tag_color: "",
                },
              };
            }),
          },
        }),
        ...(techStack[0] !== undefined && {
          tech_stack: {
            connect: techStack.map((stack) => {
              console.log(stack);
              return {
                name: stack.name,
              };
            }),
          },
        }),
        ...(professtion[0] !== undefined && {
          profession: {
            connect: {
              name: professtion[0].name,
            },
          },
        }),
      },
    },
  };
  const initData = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/Put/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(init),
    }
  ).then((response) => {
    return response.json();
  });
  console.log("init");
  console.log(initData);
  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/Put/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then((response) => {
    return response.json();
  });
  console.log(data);
};

const customStyles = makeStyles(styles);
const Overview = ({ articleValue, contestValue, handleEditing }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const classes = customStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [article, articleDispatch] = useReducer(articleReducer, articleOtion);
  const [contest, contestDispatch] = useReducer(contestReducer, contestOption);

  const [selectTechStack, setTechStack] = useState([]);
  const [selectProfesstion, setProfesstion] = useState([
    {
      color: null,
      description: null,
      id: null,
      image_url: null,
      name: "분야 선택",
    },
  ]);

  useEffect(() => {
    Promise.all([
      articleDispatch({ type: "init", result: articleValue }),
      contestDispatch({ type: "init", result: contestValue }),
      setTechStack(contestValue.tech_stack),
      setProfesstion([contestValue.profession[0]]),
    ]).then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    Promise.all([
      articleDispatch({ type: "init", result: articleValue }),
      contestDispatch({ type: "init", result: contestValue }),
      setTechStack(contestValue.tech_stack),
      setProfesstion([contestValue.profession[0]]),
      console.log(contestValue.tech_stack)
    ]).then(() => {
      setLoading(false);
    });
  }, [articleValue, contestValue]);
  const handleTechStack = (data) => {
    const newTechStack = selectTechStack.filter(
      (techStack) => techStack.name !== data.name
    );
    setTechStack([...newTechStack, data]);
  };
  const handleProfesstion = (data) => {
    setProfesstion([data]);
  };
  const handleTechStackDelete = (name) => {
    const newTechStack = selectTechStack.filter(
      (techStack) => techStack.name !== name
    );
    setTechStack([...newTechStack]);
  };
  const handleArticleTitleChange = (data) => {
    articleDispatch({ type: "contentTitle", result: data.target.value });
  };
  const handleArticleBodyChange = (data) => {
    articleDispatch({ type: "contentBody", result: data });
  };
  const handleContestTitleChange = (data) => {
    contestDispatch({ type: "contestTitle", result: data.target.value });
  };
  const handleContestContentChange = (data) => {
    contestDispatch({ type: "contestContent", result: data });
  };
  const handleStartTimePicker = (data) => {
    contestDispatch({ type: "contestStartPeriod", result: data });
  };
  const handleEndTimePicker = (data) => {
    contestDispatch({ type: "contestEndPeriod", result: data });
  };
  const handlePrize = (data) => {
    contestDispatch({ type: "contestPrize", result: data.target.value });
  };
  // const handleProfession = async (data) => {
  //   contestDispatch({ type: "contestProfession", result: data });
  // };
  // const handleTagAppender = (data) => {
  //   contestDispatch({ type: "contestTag", result: data.target.value });
  // };

  const handlePublished = async () => {
    await reqUpdate(
      article,
      contest,
      selectTechStack,
      selectProfesstion,
      router.query.id
      // tag
    );
    handleEditing();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Fragment>
      <GridContainer direction="column" spacing={3}>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer direction="row">
            <GridItem xs={1} sm={1} md={1}>
              <ProfessionsLabel data={selectProfesstion}>
                <Searcher
                  index={"professtion_index"}
                  filed={["name", "description", "type"]}
                  basicQuery={"professtion"}
                  size={12}
                  direction={"row"}
                  handle={handleProfesstion}
                >
                  <ProfessionsItem />
                </Searcher>
              </ProfessionsLabel>
            </GridItem>
            <GridItem className={classes.titleContain} xs={9} sm={9} md={9}>
              <GridContainer direction="column">
                <GridItem>
                  <TitleInput
                    onChange={handleArticleTitleChange}
                    data={article.content.title}
                  />
                </GridItem>
                <GridItem>
                  <Typography>{moment().format("YYYY.MM.DD")}</Typography>
                </GridItem>
                <GridItem>
                  {/* <TagsContainer
                  tags={contest.Tag}
                  type={"Tag"}
                  form={"textOnly"}
                /> */}
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
                        <TextField
                          className={classes.overviewBody}
                          value={contest.name}
                          onChangeCapture={(e) => {
                            handleContestTitleChange(e);
                          }}
                        />
                      </GridItem>
                      <Typography className={classes.subTitle2}>
                        {pageLabels.contestCentent}
                      </Typography>
                      <GridItem className={classes.noneFlex}>
                        <Editor
                          onChangeHandle={handleContestContentChange}
                          value={contest.content}
                        />
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
                      <GridItem className={classes.item}>
                        <TimePicker
                          onChange={handleStartTimePicker}
                          data={contest.start_period}
                        />
                        ~
                        <TimePicker
                          onChange={handleEndTimePicker}
                          data={contest.end_period}
                        />
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
                      <GridItem
                        className={classes.subTitle}
                        xs={4}
                        sm={4}
                        md={4}
                      >
                        <p>{pageLabels.contestPrize}</p>
                      </GridItem>
                      <GridItem xs={8} sm={8} md={8}>
                        <Treasure className={classes.icon} />
                        <TextField
                          type="number"
                          value={contest.prize}
                          className={classes.overviewBody}
                          onChangeCapture={(e) => {
                            handlePrize(e);
                          }}
                        ></TextField>
                        <Typography>{pageLabels.prize}</Typography>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.overviewItem}
                  >
                    <GridContainer direction="column">
                      <GridItem
                        className={classes.subTitle}
                        xs={12}
                        sm={12}
                        md={12}
                      >
                        {pageLabels.contestTechStack}
                      </GridItem>

                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        className={
                          classes.overviewBody + " " + classes.techStackContain
                        }
                      >
                        <GridContainer direction="row">
                          {selectTechStack.map((techStack) => {
                            return (
                              <GridItem
                                xs={3}
                                sm={3}
                                md={3}
                                key={techStack.name}
                                className={
                                  classes.overviewItem +
                                  " " +
                                  classes.techStackItem +
                                  " " +
                                  classes.borderRight +
                                  " " +
                                  classes.borderTop
                                }
                              >
                                <TechStackCard
                                  data={techStack}
                                  handle={handleTechStackDelete}
                                ></TechStackCard>
                              </GridItem>
                            );
                          })}
                          <GridItem
                            className={
                              classes.searcher + " " + classes.overviewItem
                            }
                            xs={3}
                            sm={3}
                            md={3}
                          >
                            <Searcher
                              index={"tech_stack_index"}
                              filed={["name", "description", "type"]}
                              basicQuery={"tech_stack"}
                              size={12}
                              direction={"row"}
                              handle={handleTechStack}
                            >
                              <TechStackItem />
                            </Searcher>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes.card}>
            <Typography className={classes.subTitle}>
              {pageLabels.content}
            </Typography>
            <Editor
              className={classes.body}
              onChangeHandle={handleArticleBodyChange}
              value={article.content.body}
            />
          </Card>
        </GridItem>
      </GridContainer>
      <IconButton
        className={classes.createButton}
        onClickCapture={async () => {
          await handlePublished();
        }}
      >
        <SaveAltIcon
          sx={{ fontSize: "2rem" }}
          style={{ color: palettes.darkBlue3 }}
        />
      </IconButton>
    </Fragment>
  );
};

export default Overview;
