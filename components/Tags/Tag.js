import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Modal from "../../components/Modal/Modal";
import SectionTagsView from "../../pages-sections/tags/SectionTagsView";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

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
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
    width: "5rem",
  },
  iconLabel: {
    fontSize: "0.8rem",
    color: "#98A8B9",
    fontFamily: "SCDream1",
    alignItems: "center",
    display: "inline-flex",
    marginLeft: "0.5rem",
  },
  roleContain: {
    marginBottom: "1rem",
    marginTop: "1rem",
  },
  roleChildren: {
    padding: "0.5rem",
  },
};

const useStyles = makeStyles(styles);

const Tag = ({ name, type, form, children }) => {
  const classes = useStyles();

  const [getTagInfo, setTagInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);

  const handleModalOpen = () => {
    setModalToggle(true);
  };
  const handleModalClose = () => {
    setModalToggle(false);
  };

  useEffect(() => {
    TagRequest(type, name).then((data) => {
      setTagInfo(data);
      setLoading(false);
    });
  }, []);

  const TagOptions = (form) => {
    switch (form) {
      case "chip":
        return (
          <Chip
            icon={
              <Image
                src={
                  getTagInfo.image_url !== null
                    ? getTagInfo.image_url
                    : `/asset/image/background/contest/default.svg`
                }
                width={32}
                height={32}
              />
            }
            label={getTagInfo.name !== null ? getTagInfo.name : ""}
          />
        );
      case "icon":
        return (
          <Box>
            <IconButton className={classes.iconButtonLabel}>
              <Image
                src={
                  getTagInfo.image_url !== null
                    ? getTagInfo.image_url
                    : `/asset/image/background/contest/default.svg`
                }
                width={24}
                height={24}
                onClick={handleModalOpen}
              />
              <p className={classes.iconLabel}>
                {getTagInfo.name !== null ? getTagInfo.name : ""}
              </p>
            </IconButton>
            <Modal
              title={getTagInfo.name !== null ? getTagInfo.name : ""}
              open={modalToggle}
              handleModalClose={handleModalClose}
            >
              <SectionTagsView
                body={
                  getTagInfo.description !== null &&
                  getTagInfo.description !== undefined
                    ? getTagInfo.description
                    : ""
                }
                image_url={
                  getTagInfo.image_url !== null
                    ? getTagInfo.image_url
                    : `/asset/image/background/contest/default.svg`
                }
              />
            </Modal>
          </Box>
        );
      case "iconOnly":
        return (
          <Box>
            <IconButton aria-label="delete" size="large">
              <Image
                src={
                  getTagInfo.image_url !== null
                    ? getTagInfo.image_url
                    : `/asset/image/background/contest/default.svg`
                }
                width={32}
                height={32}
                onClick={handleModalOpen}
              />
              {children}
            </IconButton>
            <Modal
              title={getTagInfo.name !== null ? getTagInfo.name : ""}
              open={modalToggle}
              handleModalClose={handleModalClose}
            >
              <SectionTagsView
                body={
                  getTagInfo.description !== null &&
                  getTagInfo.description !== undefined
                    ? getTagInfo.description
                    : ""
                }
                image_url={
                  getTagInfo.image_url !== null
                    ? getTagInfo.image_url
                    : `/asset/image/background/contest/default.svg`
                }
              />
            </Modal>
          </Box>
        );
      case "textOnly":
        return <Chip label={getTagInfo.name !== null ? getTagInfo.name : ""} />;
      case "role":
        return (
          <Box>
            <GridContainer direction="column">
              <GridItem>
                <GridContainer direction="row" className={classes.roleContain}>
                  <Image
                    src={
                      getTagInfo.image_url !== null
                        ? getTagInfo.image_url
                        : `/asset/image/background/contest/default.svg`
                    }
                    width={32}
                    height={32}
                  />
                  <p className={classes.iconLabel}>{getTagInfo.name}</p>
                </GridContainer>
              </GridItem>
              <GridItem className={classes.roleChildren}>{children}</GridItem>
            </GridContainer>
          </Box>
        );
      default:
        throw new Error(console.log(form));
    }
  };

  if (loading) return <div>Loading...</div>;
  return TagOptions(form);
};

export default Tag;
