/*
정도현
*/

import * as React from "react";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
//components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import TagsContainer from "../../../components/Tags/TagsContainer";

import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";

import styles from "../../../styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

// const styles = {
//   title: {
//     alignItems: "center",
//   },
//   body: {
//     margin: "2rem",
//   },
// };

const useStyles = makeStyles(styles);

const Overview = ({ article, contest, professions, handleEditing }) => {
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <GridContainer direction="column" spacing={3}>
      <GridContainer direction="row" spacing={3}>
        <GridItem xs={1} sm={1} md={1}>
          <Box bgcolor={"#88b9ff"} height="4rem" width="4rem" fontSize={"8px"}>
            {professions.map((profession) => {
              return profession.name;
            })}
          </Box>
        </GridItem>
        <GridItem xs={11} sm={11} md={11}>
          <Typography variant="h6">{article.content.title}</Typography>
          <Typography>{article.createdAt}</Typography>
          <Typography>{article.viewCount}</Typography>
          <Typography>{article.likeCount}</Typography>
          <Button onClick={handleEditing}></Button>
        </GridItem>
      </GridContainer>

      <GridContainer direction="row" spacing={3}>
        {/* <GridContainer direction="row" spacing={3}>
      </GridContainer> */}
        <GridItem xs={9} sm={9} md={9}>
          <Typography>{article.content.body}</Typography>
        </GridItem>
        <GridContainer direction="column" spacing={3} xs={3} sm={3} md={3}>
          <GridItem>
            {contest.name}
            {contest.prize}
            {contest.content}
            {contest.end_period}
            {contest.start_period}
            {/* {contest.Tag[0]} */}
          </GridItem>
          <GridItem>
            <TagsContainer
              tags={contest.tech_stack}
              type="TechStack"
              form="iconOnly"
            ></TagsContainer>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </GridContainer>
  );
};

export default Overview;

//      {article.published}
