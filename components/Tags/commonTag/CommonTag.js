import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Image from "next/image";
import { IconButton, Button, Chip } from "@material-ui/core";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TagRequest = async (type, name) => {
  const data = await fetch(`${process.env.HOSTNAME}/api/tags/${type}/${name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    return await response.json();
  });
  return data;
};

const styles = {
  root: {
    margin: "1rem",
  },
};

const useStyles = makeStyles(styles);

const CommonTag = ({
  description,
  image_url,
  name,
  type,
  color,
  handle,
  icon,
  handleDelete,
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Box className={classes.root}>
      <Chip
        label={name === null || name === undefined ? "" : name}
        variant="outlined"
        {...(icon === undefined
          ? {}
          : {
              deleteIcon: { icon },
              onDelete: () => {
                handleDelete(name);
              },
            })}
        {...(handle === undefined
          ? {}
          : {
              onClickCapture: () => {
                if (handle !== undefined) {
                  handle(name);
                }
              },
            })}
      />
    </Box>
  );
};

export default CommonTag;
