/*
정도현
*/


import React, { Fragment, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "../../CustomButtons/Button";
import TagContainer from "../../Tags/TagsContainer";
import Tag from "../../Tags/Tag";
import Role from "../../Tags/Role/Role";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import CardHeader from "../../Card/CardHeader";
import Modal from "../../Modal/Modal";
import TeamOverview from "../../../pages-sections/team/teamSections/SectionOverview";
import { Box } from "@mui/system";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import Parser from "html-react-parser";

const pageLabels = {
  roleLabel: "참가자",
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
    fontSize: "0.95rem",
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
  avatarIcon: {
    width: "2rem",
    height: "auto",
  },
};

const contestRequest = async (contestID) => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Team/Read/${contestID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });
  return data;
};

const useStyles = makeStyles(styles);

const ContestCard = (props) => {
  const classes = useStyles();

  const { contestID, className } = props;

  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  useEffect(() => {
    contestRequest(contestID)
      .then((data) => {
        setTeam(data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <Fragment>
      <Card className={classes.card + " " + className}>
        <Link
          href={`${process.env.HOSTNAME}/team/Read/${team.article_id}`}
          passHref
        >
          <CardHeader>
            <CardActionArea>
              <img
                src={
                  team.team_image_url !== null
                    ? `${team.team_image_url}`
                    : `/asset/image/background/contest/default.svg`
                }
                alt="green iguana"
                className={classes.image}
              />
            </CardActionArea>
          </CardHeader>
        </Link>
        <CardBody>
          <CardContent>
            <Box>
              <p className={classes.title}>
                {Parser(team.article.content.title)}
              </p>
              <p className={classes.body}>
                {Parser(team.article.content.body)}
              </p>
            </Box>
            <Box>
              <p className={classes.subTitle}>{pageLabels.roleLabel}</p>
              <GridContainer derection={"row"}>
                {team.team.role.map((data) => {
                  return (
                    <GridItem xs={6} sm={6} md={6} key={data.id}>
                      <Tag
                        name={data.name}
                        type={"Role"}
                        form={"role"}
                        team={data.team}
                        role={data.id}
                      >
                        <Role
                          className={classes.avatarIcon}
                          team={team.team.id}
                          role={data.id}
                        />
                      </Tag>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </Box>
          </CardContent>
        </CardBody>
      </Card>
      <Modal
        title={team.article.content.title}
        open={modalToggle}
        handleModalClose={handleModalClose}
      >
        <TeamOverview />
      </Modal>
    </Fragment>
  );
};

export default ContestCard;
