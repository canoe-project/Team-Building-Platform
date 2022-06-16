/*
정도현
*/

import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Editor from "../../../../components/Editors/CKEditorTextEditor";
import TitleInput from "../../../../components/Input/Title";
import { makeStyles } from "@material-ui/core/styles";

const pageLabels = {
  tech_stack: "기술 스택 생성",
  submitButton: "제출",
};

const styles = {};

const useStyles = makeStyles(styles);

const Published = ({
  title,
  content,
  handleArticleTitleChange,
  handleArticleBodyChange,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return <div>Loading</div>;

  return (
    <GridContainer direction="column" spacing={2}>
      <GridItem>
        <TitleInput onChange={handleArticleTitleChange} data={title} />
      </GridItem>
      <GridItem>
        <Editor
          onChangeHandle={handleArticleBodyChange}
          editorLoaded={true}
          name="article"
          value={content}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Published;
