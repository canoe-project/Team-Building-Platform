/*
정도현
*/

import { useEffect, useState, useReducer } from "react";

import Title from "../../components/Input/Title";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Editor from "../../components/Editors/CKEditorTextEditor";
import { makeStyles } from "@material-ui/core/styles";

const assetPath = {
  tech_stack: "/asset/icon/profession",
};

const styles = {
  stackImage: {
    width: "5rem",
  },
};
const useStyles = makeStyles(styles);

const techStackOption = {
  name: "",
  description: "",
  image_url: "",
};
const techStackReducer = (prevState, action) => {
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

const SectionGenerateProfessions = ({ handle }) => {
  const [techStack, dispatch] = useReducer(techStackReducer, techStackOption);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createObjectURL, setCreateObjectURL] = useState(null);
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
  const uploadToServer = async () => {
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

  const handelStackSubmit = async () => {
    if (techStack.name.length !== 0 && techStack.image_url.length !== 0) {
      const body = { ...techStack };

      await uploadToServer();
      const data = await fetch(
        `${process.env.HOSTNAME}/api/tags/Profession/${techStack.name}`,
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

  useEffect(() => {
    setCreateObjectURL("/asset/image/background/contest/default.svg");
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <GridContainer direction="column">
      <GridItem>
        <Title onChange={handleTitleChange} />
      </GridItem>
      <GridContainer direction="column">
        <GridItem>
          <img src={createObjectURL} className={classes.stackImage}></img>
        </GridItem>
        <GridItem>
          <Button variant="contained" component="label">
            <input type="file" accept="image/*" hidden onChange={onImgChange} />
          </Button>
        </GridItem>
      </GridContainer>
      <GridItem>
        <Editor
          onChangeHandle={handleDescriptionChange}
          editorLoaded={true}
          name="testName"
          data=""
        />
      </GridItem>
      <GridItem>
        <Button
          onClick={async () => {
            await handelStackSubmit().then(() => {
              handle(techStack);
            });
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default SectionGenerateProfessions;
