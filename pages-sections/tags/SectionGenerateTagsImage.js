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
  },
  body: {
    marginTop: "2rem",
    fontSize: "1rem",
    fontFamily: "SCDream4",
    color: "#414141",
  },
};
const useStyles = makeStyles(styles);

const tagOption = {
  name: "",
  description: "",
  image_url: "",
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
    case "imageUrl":
      return {
        ...prevState,
        image_url: `${assetPath.tech_stack}/${action.result}`,
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
const handelStackSubmit = async (image, tag, category) => {
  if (tag?.name.length !== 0 && tag?.image_url.length !== 0) {
    const body = { ...tag };

    await uploadToServer(image);
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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createObjectURL, setCreateObjectURL] = useState(
    "/asset/image/background/contest/default.svg"
  );
  const classes = useStyles(styles);

  const onImgChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setImage(image);
      setCreateObjectURL(URL.createObjectURL(image));
      handleImageChange(image.name);
    }
  };
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
    setCreateObjectURL("/asset/image/background/contest/default.svg");
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
      <GridContainer direction={"row"} className={classes.gridBorder}>
        <GridItem xs={4} sm={4} md={4}>
          <GridContainer direction="column">
            <GridItem>
              <Image src={createObjectURL} width={270} height={270} />
            </GridItem>
            <GridItem>
              <IconButton variant="contained" component="label">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onImgChange}
                />
                <AddAPhotoRoundedIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={8} sm={8} md={8}>
          <GridContainer direction="column">
            <Title onChange={handleTitleChange} />
            <Editor
              onChangeHandle={handleDescriptionChange}
              editorLoaded={true}
              name="testName"
              data=""
            />
            <GridItem>
              <IconButton
                onClickCapture={async () => {
                  await handelStackSubmit(image, tag, category).then(() => {
                    handle === undefined ? null : handle(tag);
                  });
                }}
              >
                <SaveAltRoundedIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        </GridItem>
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
