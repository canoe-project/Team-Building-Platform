import * as React from "react";

//components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import TagDropdown from "../../../components/Tags/TagDropdown";
import Editor from "../../../components/Editors/CKEditorTextEditor";
import Button from "../../../components/CustomButtons/Button";
import TitleInput from "../../../components/Input/Title";
import TimePicker from "../../../components/TimePicker/TimePicker";
import Slider from "../../../components/Slider/SmallSteps";
import TagAppender from "../../../components/Tags/TagAppender";

import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";

const articleOtion = {
  published: false,
  createdAt: moment().toISOString(),
  updatedAt: moment().toISOString(),
  content: {
    title: "",
    body: "",
    createdAt: moment().toISOString(),
  },
};
const contestOption = {
  name: "",
  prize: 0,
  content: "",
  end_period: null,
  start_period: null,
  createAt: moment().toISOString(),
  team: [],
  Tag: [],
  tech_stack: [],
  profession: "",
};

const articleReducer = (prevState, action) => {
  switch (action.type) {
    case "contentTitle":
      return {
        ...prevState,
        content: {
          ...prevState.content,
          title: action.result,
        },
      };
    case "contentBody":
      return {
        ...prevState,
        content: {
          ...prevState.content,
          body: action.result,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const contestReducer = (prevState, action) => {
  switch (action.type) {
    case "contestName":
      return {
        ...prevState,
        name: action.result,
      };
    case "contestPrize":
      return {
        ...prevState,
        prize: parseInt(action.result),
      };
    case "contestContent":
      return {
        ...prevState,
        content: action.result,
      };
    case "contestEndPeriod":
      return {
        ...prevState,
        end_period: moment(action.result).toISOString(),
      };
    case "contestStartPeriod":
      return {
        ...prevState,
        start_period: action.result,
      };
    case "contestTag":
      return {
        ...prevState,
        Tag: [...prevState.Tag, action.result],
      };
    case "contestTechStack":
      return {
        ...prevState,
        tech_stack: action.result,
      };
    case "contestProfession":
      return {
        ...prevState,
        profession: action.result,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const tagForm = { name: "", description: "" };

const styles = {};

const useStyles = makeStyles(styles);

const reqTags = async (type) => {
  const data = await fetch(`${process.env.HOSTNAME}/api/tags/${type}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(async (response) => {
    return await response.json();
  });
  return data;
};

const Published = () => {
  const classes = useStyles();
  const [article, articleDispatch] = React.useReducer(
    articleReducer,
    articleOtion
  );
  const [contest, contestDispatch] = React.useReducer(
    contestReducer,
    contestOption
  );
  const [professionsList, setProfessionsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    reqTags("Profession")
      .then((data) => {
        setProfessionsList(data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const handleTitleChange = (data) => {
    articleDispatch({ type: "contentTitle", result: data.target.value });
  };
  const handleArticleChange = (data) => {
    articleDispatch({ type: "contentBody", result: data });
  };
  const handleProfession = async (data) => {
    contestDispatch({ type: "contestProfession", result: data.target.value });
  };
  const handleTagAppender = (data) => {
    contestDispatch({ type: "contestTag", result: data.target.value });
  };
  const handelTimePicker = (data) => {
    contestDispatch({ type: "contestEndPeriod", result: data });
    // console.log(data);
  };

  const handlePublished = () => {
    console.log(article);
    console.log(contest);
  };

  if (loading) return <div>Loading</div>;

  return (
    <GridContainer spacing={2}>
      <GridContainer direction="row" spacing={2}>
        <GridItem xs={3} sm={3} md={3}>
          <TagDropdown names={professionsList} onClick={handleProfession} />
        </GridItem>
        <GridItem xs={7} sm={9} md={9}>
          <TitleInput onChange={handleTitleChange} />
        </GridItem>
      </GridContainer>
      <GridContainer direction="row" spacing={2}>
        <GridItem>
          <TimePicker onChange={handelTimePicker} />
        </GridItem>
        <GridItem>
          <Editor
            onChange={handleArticleChange}
            editorLoaded={true}
            name="testName"
            data="testData"
          />
          {article.content.body}
          {contest.profession}
          {contest.Tag}
        </GridItem>
        <GridItem>
          <Slider />
        </GridItem>
        <GridItem>
          <TagAppender
            names={[tagForm]}
            type="Tag"
            handle={handleTagAppender}
          />
        </GridItem>
        <GridItem>
          <Button onClick={handlePublished}>출판</Button>
        </GridItem>
      </GridContainer>
    </GridContainer>
  );
};

export default Published;