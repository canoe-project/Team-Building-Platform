import { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import GridItem from "../../Grid/GridItem";
import GridContainer from "../../Grid/GridContainer";
import { Tooltip, Typography } from "@material-ui/core";
const styles = {
  root: {
    height: "5rem",
    width: "5rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
  },
  label: {
    marginTop: "0.5rem",
    fontSize: "0.725rem",
    textAlign: "center",
    flexFlow: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
};

const useStyles = makeStyles(styles);

const ProfessionsLabel = ({ data, children }) => {
  const classes = useStyles();
  const [professions, setProfessions] = useState([
    {
      color: null,
      description: null,
      id: null,
      image_url: null,
      name: "분야",
    },
  ]);

  useEffect(() => {
    if (data !== undefined) {
      setProfessions(data[0]);
    }
  }, []);
  useEffect(() => {
    if (data !== undefined) {
      console.log(data[0]);
      setProfessions(data[0]);
    }
  }, [data]);

  return (
    <Tooltip title={professions?.name}>
      <Box>
        <div className={classes.root}>
          <img src={professions?.image_url} className={classes.icon}></img>

          <style jsx>{`
            div {
              background-color: ${professions?.color};
            }
          `}</style>
        </div>
        <Typography className={classes?.label}>
          {professions?.name} {children}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default ProfessionsLabel;
