import * as React from "react";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import TagsContainer from "../../../../components/Tags/TagsContainer";

import { makeStyles } from "@material-ui/core/styles";
import Searcher from "../../../../components/Tags/Searcher/Search";
import TechStackItem from "../../../../components/Tags/Searcher/SearcherItem/TechStackItem";
import TechStackCard from "../../../../components/CustomCard/TechStack/TechStakCard";

const pageLabels = {
  tech_stack: "기술 스택 생성",
  submitButton: "제출",
};

const styles = {
  tabGridIteam: {
    display: "inline-block",
  },
};

const useStyles = makeStyles(styles);

const Published = ({ handleTechStack, handleTechStackDelete, tech_stacks }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <GridContainer direction="row">
      {tech_stacks.map((techStack) => {
        return (
          <GridItem
            xs={3}
            sm={3}
            md={3}
            key={techStack.name}
            className={
              classes.overviewItem +
              " " +
              classes.techStackItem +
              " " +
              classes.borderRight +
              " " +
              classes.borderTop
            }
          >
            <TechStackCard
              data={techStack}
              handle={handleTechStackDelete}
            ></TechStackCard>
          </GridItem>
        );
      })}
      <GridItem
        className={
          classes.searcher + " " + classes.overviewItem
        }
        xs={3}
        sm={3}
        md={3}
      >
        <Searcher
          index={"tech_stack_index"}
          filed={["name", "description", "type"]}
          basicQuery={"tech_stack"}
          size={12}
          direction={"row"}
          handle={handleTechStack}
        >
          <TechStackItem />
        </Searcher>
      </GridItem>
    </GridContainer>
  );
};

export default Published;
