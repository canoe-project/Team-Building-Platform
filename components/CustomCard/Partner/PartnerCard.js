// 배효운

import React, { useEffect, useState, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Avatar, CardHeader, Divider } from "@mui/material";
import Tag from "../../Tags/Tag";
import TagContainer from "../../Tags/TagsContainer";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Parser from "html-react-parser";

import GridContainer from "../../Grid/GridContainer2";
import Editor from "../../Editors/CKEditorTextEditor";
import GridItem from "../../Grid/GridItem";

const styles = {
  card: {
    width: "100%",
    height: "100%",
  },
  left: {
    width: "auto",
  },
};

const useStyles = makeStyles(styles);

const PartnerCard = (props) => {
  const classes = useStyles();

  const { contestID, className } = props;
  //   const [contest, setContest] = useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Fragment>Loading...</Fragment>;
  return (
    <Link
      href={`${process.env.HOSTNAME}/profile/${contestID.user.name}`}
      prefetch
      passHref
    >
      <Card className={classes.card + " " + className}>
        <GridContainer direction={"row"}>
          <GridItem xs={8} sm={8} md={8} className={classes.left}>
            <CardContent>
              <CardHeader
                avatar={
                  <Avatar
                    alt="photo"
                    src={
                      contestID.user.image !== null
                        ? `${contestID.user.image}`
                        : `/asset/image/background/contest/default.svg`
                    }
                  />
                }
                title={contestID.user.name}
                titleTypographyProps={{ fontSize: 20, color: "#00adb5" }}
              />
              <Divider />
              <Typography>
                {contestID.profile.content !== null
                  ? Parser(contestID.profile.content)
                  : null}
              </Typography>
            </CardContent>
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Typography>기술 스택</Typography>
            <TagContainer
              tags={contestID.tech_stack}
              type={"TechStack"}
              form={"iconOnly"}
            />
          </GridItem>
        </GridContainer>
      </Card>
    </Link>
  );
};

export default PartnerCard;

//배효운
