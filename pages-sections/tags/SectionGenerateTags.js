import { useEffect, useState, useReducer } from "react";

import Title from "../../components/Input/Title";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Editor from "../../components/Editors/CKEditorTextEditor";
import { makeStyles } from "@material-ui/core/styles";
import CommaDark from "../../svg/modal/commaDark.svg";
import { Box } from "@mui/system";
import Image from "next/image";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { IconButton } from "@material-ui/core";
const assetPath = {
  tech_stack: "/asset/icon/tech_stack",
};

const styles = {
  stackImage: {
    width: "5rem",
  },
  svg: {
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: "0.85rem",
  },
  rightSVG: {
    transform: "rotate(180deg)",
    right: "0.5rem",
    bottom: "0.5rem",
  },
  leftSVG: {
    top: "0.5rem",
    left: "0.5rem",
  },
  gridBorder: {
    border: "0.5rem solid #414141",
    padding: "5rem",
    borderRadius: "1rem",
  },
  title: {
    alignItems: "center",
    fontFamily: "Do Hyeon",
    fontSize: "3rem",
    marginTop: "0",
    marginBottom: "0",
    color: " #414141",
    borderBottom: "0.35rem solid #414141",
    paddingBottom: "1rem",
    marginBottom: "1rem",
  },
  body: {
    marginTop: "2rem",
    fontSize: "1rem",
    fontFamily: "SCDream4",
    color: "#414141",
  },
  Button: {
    marginLeft: "auto",
    marginTop: "1rem",
  },
};
const useStyles = makeStyles(styles);

const tagOption = {
  name: "",
  description: "",
};
const tagReducer = (prevState, action) => {
  switch (action.type) {
    case "name":
      return {
        ...prevState,
        name: action.result,
      };
    case "description":
      return {
        ...prevState,
        description: action.result,
      };
  }
};

const uploadToServer = async (image) => {
  const body = new FormData();
  body.append("file", image);

  const response = await fetch(
    `${process.env.HOSTNAME}/api/file${assetPath.tech_stack}/`,
    {
      method: "post",
      body: body,
    }
  );
  return response;
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const handelStackSubmit = async (tag, category) => {
  if (tag?.name.length !== 0) {
    const body = { ...tag };
    const data = await fetch(
      `${process.env.HOSTNAME}/api/tags/${capitalizeFirstLetter(category)}/${
        tag.name
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await response.json() : null;

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    return data;
  }
};

const SectionGenerateTags = ({ handle, category }) => {
  const [tag, dispatch] = useReducer(tagReducer, tagOption);
  const [loading, setLoading] = useState(true);
  const classes = useStyles(styles);

  const handleTitleChange = (data) => {
    dispatch({ type: "name", result: data.target.value });
  };
  const handleDescriptionChange = (data) => {
    dispatch({ type: "description", result: data });
  };
  const handleImageChange = (data) => {
    dispatch({ type: "imageUrl", result: data });
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Box>
      <CommaDark
        width={80}
        height={80}
        className={classes.svg + " " + classes.leftSVG}
      />
      <GridContainer direction={"column"} className={classes.gridBorder}>
        <GridItem className={classes.title}>
          <Title onChange={handleTitleChange} />
        </GridItem>
        <Editor
          onChangeHandle={handleDescriptionChange}
          editorLoaded={true}
          name="testName"
          data=""
        />

        <IconButton
          className={classes.Button}
          onClickCapture={async () => {
            await handelStackSubmit(tag, category).then(() => {
              handle === undefined ? null : handle(tag);
            });
          }}
        >
          <SaveAltRoundedIcon />
        </IconButton>
      </GridContainer>
      <CommaDark
        width={80}
        height={80}
        className={classes.rightSVG + " " + classes.svg}
      />
    </Box>
  );
};

export default SectionGenerateTags;
