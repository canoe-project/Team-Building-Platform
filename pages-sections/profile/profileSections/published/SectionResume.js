// 배효운

import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import TagsContainer_resume from "../../../../components/Tags/TagsContainer_resume";

import { makeStyles } from "@material-ui/core/styles";
import TechStackSearcher from "../../../../components/Tags/TechStack/TechStackSearcher";

const pageLabels = {
  tech_stack: "분야 생성",
  submitButton: "제출",
};

const styles = {
  tabGridIteam: {
    display: "inline-block",
  },
};

const useStyles = makeStyles(styles);

const Published = ({
    handleResume,
    resume,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  let i = 0;
  for(; i < resume.length; i++){
  resume[i].name = resume[i].resume_name;
  }

  if (loading) return <div>Loading</div>;

  return (
    <GridContainer direction="column" spacing={2}>
      <GridItem className={classes.tabGridIteam}>
        <TagsContainer_resume tags={resume} type="Resume" form="chip">
          {/* <TechStackSearcher handle={handleTechStack} /> */}
        </TagsContainer_resume>
      </GridItem>
    </GridContainer>
  );
};

export default Published;
