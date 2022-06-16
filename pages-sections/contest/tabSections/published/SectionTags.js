/*
정도현
*/

import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import TagAppender from "../../../../components/Tags/TagAppender";
import TagsContainer from "../../../../components/Tags/TagsContainer";

import { makeStyles } from "@material-ui/core/styles";
import TechStackSearcher from "../../../../components/Tags/TechStack/TechStackSearcher";

const pageLabels = {
  tech_stack: "기술 스택 생성",
  submitButton: "제출",
};

const styles = {};

const useStyles = makeStyles(styles);

const Published = ({
  handleTagAppender,
  handleTechStack,
  tech_stacks,
  tag,
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
        <TagAppender tag={tag} type="Tag" handle={handleTagAppender} />
      </GridItem>
      <GridItem>
        <TagsContainer tags={tech_stacks} type="TechStack" form="iconOnly">
          <TechStackSearcher handle={handleTechStack} />
        </TagsContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Published;
