/*
정도현
*/

import { useState, useEffect, Fragment, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
//components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import MainLayout from "../../../components/Layout/MainLayout";
import Title from "../../../components/Input/Title";
import Editor from "../../../components/Editors/CKEditorTextEditor";
import { Typography } from "@material-ui/core";
import styles from "../../../styles/jss/nextjs-material-kit/pages/published/teamCreate";
import Searcher from "../../../components/Tags/Searcher/Search";
import RoleItem from "../../../components/Tags/Searcher/SearcherItem/RoleItem";
import RoleCard from "../../../components/CustomCard/Role/RoleCard";
import palettes from "../../../styles/nextjs-material-kit/palettes";

import { IconButton } from "@material-ui/core";

import { getSession, useSession, signIn, signOut } from "next-auth/react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import moment from "moment";
import { useRouter } from "next/router";
import SectionHeaderImage from "../../headerImage/SectionHeaderImage";
import createChannel from "../../../components/StreamChat/createChannel";
import SectionGenerateTagsImage from "../../../pages-sections/tags/SectionGenerateTagsImage";
const pageLabels = {
  roleLabel: "모집 분야",
  participantsLabel: "참여자",
  joinButton: "신청",
  placeholder: "제목 입력",
  teamContent: "개요",
  roleLabel: "모집 분야",
};

const articleOtion = {
  published: false,
  createdAt: moment().toISOString(),
  updatedAt: moment().toISOString(),
  viewCount: 0,
  likeCount: 0,
  content: {
    title: "",
    body: "",
    createdAt: moment().toISOString(),
  },
};
const teamOption = {
  name: "",
  createAt: moment().toISOString(),
  // Tag: [],
  // tech_stack: [],
  // profession: [{}],
  citizens: "",
  role: [],
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

const teamReducer = (prevState, action) => {
  switch (action.type) {
    case "init":
      return { ...action.result };
    case "teamName":
      return { ...prevState, name: action.result };
    case "teamRole":
      return {
        ...prevState,
        role: action.result,
      };
    case "teamCitizens":
      return {
        ...prevState,
        citizens: action.result,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const postTeamArticle = async (owner, article, team, id, imageURL) => {
  const init = {
    team: {
      update: {
        role: {
          set: [],
        },
      },
    },
    include: {
      team: {
        role: true,
      },
    },
  };

  const body = await {
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
    team: {
      update: {
        name: team.name,
        citizens: {
          connect: {
            user_id: owner,
          },
        },
        ...(team.role[0] !== undefined && {
          role: {
            connectOrCreate: team.role.map((role) => {
              return {
                where: {
                  name: role.name,
                },
                create: {
                  name: role.name,
                  image_url: role.image_url,
                  description: role.description,
                },
              };
            }),
          },
        }),
      },
    },
    team_image_url: imageURL,
  };
  const initData = await fetch(
    `${process.env.HOSTNAME}/api/article/Team/Put/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(init),
    }
  ).then((response) => {
    return response.json();
  });
  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Team/Put/${id}`,
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

const useStyles = makeStyles(styles);

const CreateTeam = ({
  articleValue,
  teamValue,
  handleEditing,
  imageURLValue,
}) => {
  const { data: session, status } = useSession();
  const classes = useStyles();

  const [selectRole, setSelectRole] = useState([]);

  const [article, articleDispatch] = useReducer(articleReducer, articleOtion);
  const [team, teamDispatch] = useReducer(teamReducer, teamOption);
  const [imageURL, setImageURL] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      articleDispatch({ type: "init", result: articleValue }),
      teamDispatch({ type: "init", result: teamValue }),
      setSelectRole(teamValue.role),
      setImageURL(imageURLValue),
    ]).then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    Promise.all([
      articleDispatch({ type: "init", result: articleValue }),
      teamDispatch({ type: "init", result: teamValue }),
      setSelectRole(teamValue.role),
      setImageURL(imageURLValue),
    ]).then(() => {
      setLoading(false);
    });
  }, [articleValue, teamValue]);
  useEffect(() => {
    handleTeamRole(selectRole);
  }, [selectRole]);

  const handleArticleInit = (daa) => {
    articleDispatch({ type: "init", result: articleOtion });
  };
  const handleContentTitle = (data) => {
    articleDispatch({ type: "contentTitle", result: data.target.value });
    teamDispatch({ type: "teamName", result: data.target.value });
  };
  const handleContentBody = (data) => {
    articleDispatch({ type: "contentBody", result: data });
  };
  const handleTeamInit = () => {
    teamDispatch({ type: "init", result: teamOption });
  };
  const handleTeamName = (data) => {
    teamDispatch({ type: "teamName", result: data });
  };
  const handleTeamRole = (data) => {
    teamDispatch({ type: "teamRole", result: data });
  };
  const handleTeamCitizens = (data) => {
    teamDispatch({ type: "teamCitizens", result: data });
  };

  const handleSelectRole = (data) => {
    const newRole = selectRole.filter((role) => role.name !== data.name);
    setSelectRole([...newRole, data]);
  };
  const handleSelectRoleDelete = (name) => {
    const newRole = selectRole.filter((role) => role.name !== name);
    setSelectRole([...newRole]);
  };
  const handleImageURL = (url) => {
    setImageURL(url);
  };
  return (
    <Fragment>
      <GridContainer direction="column">
        <GridItem xs={12} sm={12} md={12}>
          <SectionHeaderImage
            contestImage={imageURLValue}
            editing={true}
            category={"team"}
            handleName={handleImageURL}
          />
        </GridItem>
        <GridItem className={classes.titleContain} xs={9} sm={9} md={9}>
          <GridContainer direction="column">
            <GridItem>
              <Title
                placeholder={pageLabels.placeholder}
                onChange={handleContentTitle}
                data={article.content.title}
              />
            </GridItem>
            <GridItem className={classes.subTitle}>
              <Typography>{moment().format("YYYY.MM.DD")}</Typography>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Card className={classes.card}>
            <Typography className={classes.subTitle}>
              {pageLabels.teamContent}
            </Typography>
            <Editor
              className={classes.body}
              onChangeHandle={handleContentBody}
              value={article.content.body}
            ></Editor>
          </Card>
        </GridItem>
        <GridItem className={classes.subTitle}>{pageLabels.roleLabel}</GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <GridContainer direction="row">
              <GridContainer
                direction="row"
                className={classes.roleCardContain}
              >
                {selectRole.map((role) => {
                  return (
                    <GridItem
                      xs={3}
                      sm={3}
                      md={3}
                      key={role.name}
                      className={
                        classes.overviewItem + " " + classes.borderRight
                      }
                    >
                      <RoleCard
                        role={role}
                        handle={handleSelectRoleDelete}
                      ></RoleCard>
                    </GridItem>
                  );
                })}
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  key={"Searcher"}
                  className={
                    classes.overviewItem +
                    " " +
                    classes.borderRight +
                    " " +
                    classes.searcher
                  }
                >
                  <Searcher
                    index={"role_index"}
                    filed={["name", "description", "type"]}
                    basicQuery={"role"}
                    size={10}
                    handle={handleSelectRole}
                    modal={
                      <SectionGenerateTagsImage
                        category={"role"}
                        handl={handleSelectRole}
                      />
                    }
                    modalLabel={"역할 생성"}
                  >
                    <RoleItem />
                  </Searcher>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}></GridItem>
      </GridContainer>
      <IconButton
        className={classes.createButton}
        onClickCapture={async () => {
          await postTeamArticle(
            session.user.id,
            article,
            team,
            router.query.id,
            imageURL
          ).then(() => {
            router.reload(window.location.pathname);
          });
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

export default CreateTeam;
