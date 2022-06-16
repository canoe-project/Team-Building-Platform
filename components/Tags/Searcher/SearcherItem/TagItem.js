/*
정도현
*/


import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Box } from "@mui/system";
import Link from "next/link";
import Parser from "html-react-parser";
import moment from "moment";
const pageLabels = {
  contestBodyLabel: "개요",
  techStackLabel: "기술 스택",
  prize: "원",
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
    fontSize: "1rem",
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
};

const roleOption = {
  "@timestamp": "",
  description: "",
  image_url: "",
  name: "",
  type: "",
};

const useStyles = makeStyles(styles);

const TagItem = ({ data, handle }) => {
  const { description, image_url, name, type } = data._source;
  const classes = useStyles();
  const [role, setRole] = useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {

  }, [data._source]);
  if (loading) return <Fragment>Loading...</Fragment>;
  return (
    <MenuItem
      onClickCapture={() => {
        handle(data._source);
      }}
    >
      {name}
    </MenuItem>
  );
};

export default TagItem;
