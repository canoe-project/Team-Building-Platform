import { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "nowrap",
    listStyle: "none",
    padding: 8,
    margin: 0,
    overflow: "auto",
    maxWidth: "100%",
    height: "4rem",
    gap: "1rem",
  },
};

const useStyles = makeStyles(styles);

const FilerContain = ({ children }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });
  if (loading) return <Fragment>Loading</Fragment>;
  return (
    <Box component="ul" className={classes.root}>
      {children}
    </Box>
  );
};

export default FilerContain;
