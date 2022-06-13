import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Box } from "@mui/system";
import Link from "next/link";
import Parser from "html-react-parser";
import GridItem from "../../../Grid/GridItem";
import moment from "moment";
import Image from "next/image";

const pageLabels = {
  contestBodyLabel: "개요",
  techStackLabel: "기술 스택",
  prize: "원",
};

const styles = {
  root: {
    height: "5rem",
    width: "auto",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    margin: "0.5rem",
  },
  contain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  icon: {
    width: "4rem",
    height: "4rem",
    alignSelf: "center",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  label: {
    marginTop: "0.5rem",
    fontSize: "0.725rem",
    textAlign: "center",
  },
};

const roleOption = {
  "@timestamp": "",
  description: "",
  image_url: "",
  name: "",
  type: "",
};

const useStyles = makeStyles(styles);

const RoleCard = ({ data, handle }) => {
  const { description, image_url, name, type, color } = data._source;
  const classes = useStyles();
  const [role, setRole] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {}, [data._source]);
  if (loading) return <Fragment>Loading...</Fragment>;
  return (
    <GridItem
      onClickCapture={() => {
        handle(data._source);
      }}
      xs={4}
      sm={4}
      md={4}
    >
      <Box className={classes.contain}>
        <img
          src={
            image_url !== null
              ? image_url
              : `/asset/image/background/contest/default.svg`
          }
          className={classes.icon}
        />
        <p className={classes.label}>{name}</p>
        <style jsx>{`
          img {
            background-color: ${color};
          }
        `}</style>
      </Box>
    </GridItem>
  );
};

export default RoleCard;
