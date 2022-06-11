import { Fragment, useEffect, useState, useReducer } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@material-ui/core/styles";

//components
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import MainLayout from "../../../../components/Layout/MainLayout";
import TabPanel from "../../../../components/Tab/TabPanel";
import Button from "../../../../components/CustomButtons/Button";
//contest section
import ContestOverview from "../../../../pages-sections/contest/tabSections/SectionOverview";
import ContestHeaderImage from "../../../../pages-sections/contest/tabSections/SectionHeaderImage";
import ContestPublished from "../../../../pages-sections/contest/tabSections/SectionPublished";
//team section
import TeamList from "../../../../pages-sections/team/teamSections/SectionTeamList";
//svg

const styles = {
  title: {
    borderBottom: "0.5px",
    borderBottomStyle: "solid",
    alignItems: "center",
  },
  body: {
    margin: "2rem",
  },
  contestHead: {},
  headerImage: {
    height: "15rem",
  },
  headerButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
};

const useStyles = makeStyles(styles);

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const BasicTabs = ({ data }) => {
  const [value, setValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles(styles);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  const handleEditing = () => {
    setEditing(!editing);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <MainLayout>
      <GridContainer direction="column" className={classes.contestHead}>
        <GridItem>
          <ContestHeaderImage
            editing={editing}
            contestImage={data.constest_image_url}
          />
        </GridItem>
        <GridItem>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="개요" {...a11yProps(0)} />
            <Tab label="팀" {...a11yProps(1)} />
          </Tabs>
        </GridItem>
      </GridContainer>
      <TabPanel value={value} index={0}>
        {editing ? (
          <ContestPublished
            articleValue={{ ...data.article }}
            contestValue={{ ...data.contest }}
            handleEditing={handleEditing}
          />
        ) : (
          <ContestOverview
            article={data.article}
            contest={data.contest}
            professions={data.contest.profession}
            handleEditing={handleEditing}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TeamList contest={data.contest_id} />
      </TabPanel>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { page } = context.query;
  const { id } = context.query;
  const data = await fetch(
    `${process.env.HOSTNAME}/api/article/Contest/${page}/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
  return { props: { data } };
}

export default BasicTabs;
