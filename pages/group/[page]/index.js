/*
정도현
*/


import { useState, useEffect } from "react";
import Link from "next/link";

import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import CardFooter from "../../../components/Card/CardFooter";
import { CardActionArea } from "@mui/material";

import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Paginations from "../../../components/Pagination/Pagination";
import MainLayout from "../../../components/Layout/MainLayout";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ChatList = dynamic(
  () => import("../../../components/StreamChat/ChatList"),
  { ssr: false }
);
import { getSession, useSession, signIn, signOut } from "next-auth/react";

const reqGroupList = async (userID, page) => {
  const data = await fetch(
    `${process.env.HOSTNAME}/api/group/${page}?take=${12}&user=${userID}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then(async (response) => {
    return await response.json();
  });
  return data;
};

const style = {};

const useStyles = makeStyles(style);

const GroupList = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    reqGroupList(session.user.id, router.query.page).then((data) => {
      setGroupList(data, setLoading(false));
    });
  }, []);

  if (loading) return <div>loading</div>;
  return (
    <MainLayout>
      <ChatList />
    </MainLayout>
  );
  // return (
  //   <MainLayout>
  //     <GridContainer direction="column" spacing={2}>
  //       {groupList.map((d) => {
  //         return (
  //           <GridItem key={d.id} xs={12} sm={12} md={12}>
  //             <Card>
  //               <Link
  //                 href={`${process.env.HOSTNAME}/group/Read/${d.id}`}
  //                 passHref
  //               >
  //                 <CardActionArea>
  //                   <CardBody>{d.name}</CardBody>
  //                 </CardActionArea>
  //               </Link>
  //             </Card>
  //           </GridItem>
  //         );
  //       })}
  //     </GridContainer>
  //   </MainLayout>
  // );
};

export default GroupList;

export async function getServerSideProps(context) {
  //   const maxPage = await fetch(
  //     `${process.env.HOSTNAME}/api/article/Contest?${
  //       currentProfession !== undefined
  //         ? `&currentProfession=${currentProfession}`
  //         : ""
  //     }`,
  //     {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   ).then(async (response) => {
  //     return await response.json();
  //   });
  return { props: {} };
}
