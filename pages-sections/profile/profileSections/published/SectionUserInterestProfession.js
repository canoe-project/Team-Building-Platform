// 배효운

import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import TagsContainer from "../../../../components/Tags/TagsContainer";

import { makeStyles } from "@material-ui/core/styles";

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

const Published = ({ handleUserInterestProfessionChange, profession }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <GridContainer direction="column" spacing={2}>
      <GridItem className={classes.tabGridIteam}>
        <TagsContainer tags={profession} type="Profession" form="iconOnly">
          {/* <TechStackSearcher handle={handleTechStack} /> */}
        </TagsContainer>
      </GridItem>
    </GridContainer>
  );
};

export default Published;
