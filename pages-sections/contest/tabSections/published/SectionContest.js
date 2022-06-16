/*
정도현
*/

import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import TagDropdown from "../../../../components/Tags/TagDropdown";
import Editor from "../../../../components/Editors/CKEditorTextEditor";
import TitleInput from "../../../../components/Input/Title";
import TimePicker from "../../../../components/TimePicker/TimePicker";
import Slider from "../../../../components/Slider/SmallSteps";

import { makeStyles } from "@material-ui/core/styles";

const pageLabels = {
  tech_stack: "기술 스택 생성",
  submitButton: "제출",
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

const Published = ({
  profession,
  end_period,
  content,
  name,
  prize,
  handleProfession,
  handleContestTitleChange,
  handleContestContentChange,
  handleTimePicker,
  handlePrize,
}) => {
  const classes = useStyles();
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
  if (loading) return <div>Loading</div>;

  return (
    <GridContainer direction="column" spacing={2}>
      <GridItem xs={2} sm={2} md={2}>
        <TagDropdown
          names={professionsList}
          onClick={handleProfession}
          data={profession}
        />
      </GridItem>
      <GridItem xs={9} sm={9} md={9}>
        <TitleInput onChange={handleContestTitleChange} data={name} />
      </GridItem>
      <GridItem>
        <TimePicker onChange={handleTimePicker} data={end_period} />
      </GridItem>
      <GridItem>
        <Editor
          onChangeHandle={handleContestContentChange}
          editorLoaded={true}
          name="testName"
          value={content}
        />
      </GridItem>
      <GridItem>
        <Slider onChange={handlePrize} data={prize} />
      </GridItem>
    </GridContainer>
  );
};

export default Published;
