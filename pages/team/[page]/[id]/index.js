import { useState, useEffect, Fragment } from "react";
import classNames from "classnames";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Card from "../../../../components/Card/Card";
import Button from "../../../../components/CustomButtons/Button";
import MainLayout from "../../../../components/Layout/MainLayout";
import Role from "../../../../components/Tags/Role/Role";
import Tag from "../../../../components/Tags/Tag";
import moment from "moment";
import SectionComments from "../../../../pages-sections/comment/SectionComments";
import SectionHeaderImage from "../../../../pages-sections/contest/tabSections/SectionHeaderImage";
import Parser from "html-react-parser";
import palettes from "../../../../styles/nextjs-material-kit/palettes";

import createInvite from "../../../../components/StreamChat/CreateInvite";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
const styles = {
  title: {
    alignItems: "center",
    fontFamily: "Do Hyeon",
    fontSize: "3rem",
    marginTop: "0",
    marginBottom: "0",
  },
  titleContain: {
    marginLeft: "1rem",
  },
  dateContain: {
    marginLeft: "100%",
  },
  body: {
    color: "#263747",
    fontFamily: "SCDream3",
    fontSize: "1rem",
    minHeight: "20rem",
  },
  icon: {
    height: "2rem",
    width: "2rem",
    alignItems: "center",
    marginRight: "1rem",
  },
  iconContain: {
    marginRight: "0.5rem",
  },
  iconMenuIcon: {
    height: "2rem",
    width: "2rem",
    marginLeft: "100%",
  },
  editor: {
    border: "none",
  },
  menu: {
    height: "20rem",
  },
  card: {
    padding: "2.5rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  overview: {
    height: "100%",
    padding: "2rem",
  },
  overviewItem: {
    alignItems: "start",
    justifyContent: "center",
  },
  overviewBody: {
    fontSize: "1rem",
  },
  borderRight: {
    borderRight: "0.0625rem solid #D7E2EB",
  },
  subTitle: {
    marginTop: "1rem",
    marginBottom: "1.5rem",
    fontFamily: "SCDream4",
    fontWeight: "bold",
  },
  avatarIcon: {
    width: "2rem",
    height: "2rem",
  },
  comment: {
    width: "100%",
  },
  cardFooter: {
    marginTop: "auto",
  },
  joinButton: {
    marginTop: "1.25rem",
    width: "8rem",
    height: "2.5rem",
    backgroundColor: palettes.hotPink,
    "&:hover": {
      background: palettes.darkPink1,
    },
    marginLeft: "auto",
    marginRight: "1rem",
  },
};

const pageLabels = {
  roleLabel: "모집 분야",
  participantsLabel: "참여자",
  joinButton: "신청",
  teamContent: "개요",
};

const useStyles = makeStyles(styles);

const reqUpdateMembers = async (userID, roleID, id) => {
  const teamBody = {
    team: {
      update: {
        citizens: {
          connect: {
            user_id: userID,
          },
        },
      },
    },
  };
  const roleBody = {
    Role: {
      connect: {
        id: roleID,
      },
    },
  };
  const teamData = await fetch(
    `${process.env.HOSTNAME}/api/article/Team/PUT/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamBody),
    }
  ).then((response) => {
    return response.json();
  });
  const citizensData = await fetch(
    `${process.env.HOSTNAME}/api/profile/${userID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roleBody),
    }
  ).then((response) => {
    return response.json();
  });

  return citizensData;
};

const Overview = ({ data }) => {
  const { data: session, status } = useSession();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  useEffect(() => {
    console.log(data);
    setLoading(false);
  }, []);

  return (
    <MainLayout>
      <SectionHeaderImage
        contestImage={data.team_image_url}
        editing={editing}
      />
      <GridContainer direction="column">
        <GridItem className={classes.titleContain} xs={9} sm={9} md={9}>
          <GridContainer direction="column">
            <GridItem>
              <p className={classes.title}>{data.article.content.title}</p>
            </GridItem>
            <GridItem>
              <p>{moment(data.article.createdAt).format("YYYY.MM.DD")}</p>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Card className={classes.card}>
            <Typography className={classes.subTitle}>
              {pageLabels.teamContent}
            </Typography>
            <Box className={classes.body}>
              {Parser(data.article.content.body)}
            </Box>
          </Card>
        </GridItem>
        <GridItem className={classes.subTitle}>{pageLabels.roleLabel}</GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <GridContainer direction="row">
              {data.team.role.map((role) => {
                return (
                  <GridItem
                    xs={3}
                    sm={3}
                    md={3}
                    className={classes.overviewItem + " " + classes.borderRight}
                    key={role.id}
                  >
                    <GridContainer
                      direction="column"
                      className={classes.overview}
                    >
                      <GridItem
                        xs={7}
                        sm={7}
                        md={7}
                        className={classes.overviewBody}
                      >
                        <Tag
                          name={role.name}
                          type={"Role"}
                          form={"role"}
                          team={role.team}
                          role={role.id}
                        >
                          <p>{role.description}</p>
                        </Tag>
                      </GridItem>
                      <GridItem
                        className={classes.subTitle + " " + classes.cardFooter}
                      >
                        <span>{pageLabels.participantsLabel}</span>
                      </GridItem>
                      <GridItem>
                        <GridContainer direction="row">
                          <GridItem xs={12} sm={12} md={12}>
                            <Role
                              className={classes.avatarIcon}
                              team={data.team.id}
                              role={role.id}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <Button
                        className={classes.joinButton}
                        onClick={(e) => {
                          console.log(e);
                          reqUpdateMembers(
                            session.user.id,
                            role.id,
                            router.query.id
                          );
                          createInvite(
                            data.citizens.user_id,
                            data.citizens.user_id,
                            data.id,
                            session.user.id
                          );
                        }}
                      >
                        {pageLabels.joinButton}
                      </Button>
                    </GridContainer>
                  </GridItem>
                );
              })}
            </GridContainer>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <SectionComments className={classes.comment} />
        </GridItem>
      </GridContainer>
    </MainLayout>
  );
};

export default Overview;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Team/Read/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  return { props: { data } };
}
