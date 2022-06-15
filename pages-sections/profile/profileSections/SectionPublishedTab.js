// 배효운

import { useEffect, useState, useReducer, Fragment } from "react";
import { useRouter } from "next/router";
//components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem2 from "../../../components/Grid/GridItem2";
import TabPanel from "../../../components/Tab/TabPanel";
import Button from "../../../components/CustomButtons/Button";
import MainLayout from "../../../components/Layout/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SectionProfile from "./published/SectionProfile";
import SectionTags from "./published/SectionTags";
import SectionProfession from "./published/SectionProfession";
import SectionCertificate from "./published/SectionCertificate";
import SectionProgram from "./published/SectionProgram";
import SectionResume from "./published/SectionResume";
import moment from "moment";
import { getSession, useSession, signIn, signOut } from "next-auth/react";

const pageLabels = {
  tech_stack: "기술 스택 생성",
  submitButton: "제출",
};

const citizensOption = {
  id: 0,
  user_id: "",
  certificate: [],
  program: [],
  user_attention_profession: [],
  user: [],
  profile: [],
  team: [],
  tech_stack: [],
  profession: [{}],
};

const citizensReducer = (prevState, action) => {
  switch (action.type) {
    case "init":
      return { ...action.result };
    case "citizensCertificate":
      return {
        ...prevState,
        certificate: [...prevState.certificate, action.result],
      };
    case "citizensProgram":
      return {
        ...prevState,
        program: [...prevState.program, action.result],
      };
    case "citizensUserAttentionProfession":
      return {
        ...prevState,
        user_attention_profession: [
          ...prevState.user_attention_profession,
          action.result,
        ],
      };
    case "citizensEmail":
      return {
        ...prevState,
        user: { email: action.result },
      };
    case "citizensContent":
      return {
        ...prevState,
        profile: { content: action.result },
      };
    case "citizensTechStack":
      return {
        ...prevState,
        tech_stack: [...prevState.tech_stack, action.result],
      };
    case "citizensProfession":
      return {
        ...prevState,
        profession: [...prevState.profession, action.result],
      };
    case "citizensResume":
      return {
        ...prevState,
        resume: [...prevState.resume, action.result],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const reqUpdate = async (citizens, techStack, id) => {
  const init = {
    tech_stack: {
      set: [],
    },
  };
  const body = await {
        // profession : citizens.profession,
        ...(citizens.profession[0] !== undefined && {
          profession: {
            connect: citizens.profession.map((stack) => {
              return {
                name: stack.name,
              };
            }),
          },
        }),
        ...(techStack[0] !== undefined && {
          tech_stack: {
            connect: techStack.map((stack) => {
              return {
                name: stack.name,
              };
            }),
          },
        }),
        ...(citizens.certificate[0] !== undefined && {
          certificate: {
            connect: citizens.certificate.map((stack) => {
              return {
                name: stack.name,
              };
            }),
          },
        }),
        //program : citizens.program,
        ...(citizens.certificate[0] !== undefined && {
          certificate: {
            connect: citizens.certificate.map((stack) => {
              return {
                name: stack.name,
              };
            }),
          },
        }),

        user: {
          update: {
            email: citizens.user.email,
          },
        },

        profile: {
          update: {
            content: citizens.profile.content,
            view_count: citizens.profile.view_count,
            like_count: citizens.profile.like_count,
            ...(citizens.profile[0] !== undefined && {
              resume: {
                connect: citizens.profile.resume.map((stack) => {
                  return {
                    name: stack.name,
                  };
                }),
              },
            }),
          },
        },

        ...(citizens[0] !== undefined && {
          user_attention_profession: {
            connect: citizens.user_attention_profession.map((stack) => {
              return {
                name: stack.name,
              };
            }),
          },
        }),
      
    
  }
  const initData = await fetch(`${process.env.HOSTNAME}/api/profile/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(init),
  }).then((response) => {
    return response.json();
  });
  const data = await fetch(`${process.env.HOSTNAME}/api/profile/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((response) => {
    return response.json();
  });
};

const styles = {
  tabGridIteam: {
    display: "inline-block",
  },
};

const useStyles = makeStyles(styles);

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const PublishedTab = ({ citizensValue, handleEditing }) => {
  const router = useRouter();
  const [citizens, citizensDispatch] = useReducer(
    citizensReducer,
    citizensOption
  );
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectTechStack, setTechStack] = useState([]);
  const classes = useStyles(styles);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: session, status } = useSession();



  useEffect(() => {
    Promise.all([
      citizensDispatch({ type: "init", result: citizensValue }),
      setTechStack(citizensValue.tech_stack),
    ]).then(() => {
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    Promise.all([
      citizensDispatch({ type: "init", result: citizensValue }),
      setTechStack(citizensValue.tech_stack),
      console.log(citizensValue.tech_stack)
    ]).then(() => {
      setLoading(false);
    });
  }, [citizensValue]);
  const handleEmailChange = (data) => {
    citizensDispatch({ type: "citizensEmail", result: data.target.value });
  };
  const handleContentChange = (data) => {
    citizensDispatch({ type: "citizensContent", result: data });
  };
  const handleUserInterestProfessionChange = (data) => {
    citizensDispatch({ type: "citizensUserAttentionProfession", result: data });
  };
  const handleResume = (data) => {
    citizensDispatch({ type: "citizensResume", result: data });
  };
  const handleProfession = async (data) => {
    citizensDispatch({ type: "citizensProfession", result: data });
  };
  const handleCertificate = (data) => {
    citizensDispatch({ type: "citizensCertificate", result: data });
  };
  const handleProgram = (data) => {
    citizensDispatch({ type: "citizensProgram", result: data });
  };
  const handleTechStack = (data) => {
    const newTechStack = selectTechStack.filter(
      (techStack) => techStack.name !== data.name
    );
    setTechStack([...newTechStack, data]);
  };
  const handleTechStackDelete = (name) => {
    const newTechStack = selectTechStack.filter(
      (techStack) => techStack.name !== name
    );
    setTechStack([...newTechStack]);
    console.log(newTechStack);
  };

  const handlePublished = async (id) => {
    await reqUpdate(citizens, selectTechStack, id);
    handleEditing();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <MainLayout>
      <GridContainer direction="row" className={classes.contestHead}>
        <GridItem2 xs={3} sm={3} md={3} className={classes.tabGridIteam}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="개인정보" {...a11yProps(0)} />
            <Tab label="관련분야" {...a11yProps(1)} />
            <Tab label="관심있는 분야" {...a11yProps(2)} />
            <Tab label="태그" {...a11yProps(3)} />
            {/* <Tab label="이력서" {...a11yProps(4)} /> */}
            {/* <Tab label="자격증" {...a11yProps(4)} /> */}
            <Tab label="활용 가능한 프로그램" {...a11yProps(4)} />
          </Tabs>
        </GridItem2>
        <GridItem2 xs={9} sm={9} md={9} className={classes.tabGridIteam}>
          <TabPanel value={value} index={0}>
            <SectionProfile
              email={citizens.user.email}
              content={citizens.profile.content}
              handleEmailChange={handleEmailChange}
              handleContentChange={handleContentChange}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SectionProfession
              handleProfession={handleProfession}
              profession={citizens.profession}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SectionProfession
              handleProfession={handleProfession}
              profession={
                citizens.user_attention_profession.length !== 0
                  ? citizens.user_attention_profession[0].profession
                  : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SectionTags
              handleTechStack={handleTechStack}
              handleTechStackDelete={handleTechStackDelete}
              tech_stacks={selectTechStack}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <SectionProgram
              handleProgram={handleProgram}
              program={citizens.program}
            />
          </TabPanel>
          <Button onClick={() => handlePublished(citizensValue.user_id)}
            color="success"
          >
            {pageLabels.submitButton}
          </Button>
        </GridItem2>
      </GridContainer>
    </MainLayout>
  );
};

export default PublishedTab;
