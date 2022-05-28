import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Tag from "../../Tags/Tag";
import TagContainer from "../../Tags/TagsContainer";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import DateProgress from "../../Progress/DateProgress";
const styles = {
  card: {
    width: "auto",
    height: "100%",
  },
  image: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
};

const useStyles = makeStyles(styles);

const ContestCard = (props) => {
  const classes = useStyles();

  const { contestID, className } = props;

  const [contest, setContest] = useState({});
  const [loading, setLoading] = React.useState(true);

  const contestRequest = async (contestID) => {
    const data = await fetch(
      `${process.env.HOSTNAME}/api/article/Contest/page/${contestID}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (response) => {
      return await response.json();
    });
    setContest(data);
  };

  useEffect(() => {
    contestRequest(contestID).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Link href={`${process.env.HOSTNAME}/contest/Read/${contest.id}`} passHref>
      <Card className={classes.card + " " + className}>
        <CardActionArea>
          <img
            src={
              contest.constest_image_url !== null
                ? `${contest.constest_image_url}`
                : `/asset/image/background/contest/default.svg`
            }
            alt="green iguana"
            className={classes.image}
          />
        </CardActionArea>
        <CardContent>
          <Typography>{contest.contest.team.length}명 </Typography>
          <Typography>{contest.article.content.title}</Typography>
          <TagContainer
            tags={contest.contest.tech_stack}
            type="TechStack"
            form="iconOnly"
          />
          <Typography>{contest.contest.start_period}</Typography>
          <Typography>{contest.contest.end_period}</Typography>
          <Typography>{contest.contest.prize}원</Typography>
        </CardContent>
        <TagContainer tags={contest.contest.Tag} type="Tag" form="textOnly" />
      </Card>
    </Link>
  );
};

export default ContestCard;
