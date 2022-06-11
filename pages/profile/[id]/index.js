import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../../../components/CustomCard/Profile/ProfileCard";
import css from "styled-jsx/css";
import React, { useEffect, useState, useReducer, Fragment } from "react";
import styles from "../../../styles/jss/nextjs-material-kit/components/cardStyle";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tabs, Tab,  IconButton } from "@mui/material";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import FavoriteIcon from '@mui/icons-material/Favorite';


import Header from "../../../components/header/Header";

// import ProfileOverview from "../../../../pages-sections/profile/profileSections/SectionOverview";
// import ProfileHeaderImage from "../../../../pages-sections/profile/profileSections/SectionHeaderImage";
import ProfilePublishedTab from "../../../pages-sections/profile/profileSections/SectionPublishedTab";




const useStyles = makeStyles(styles);


const requestProfileUpdate = async() => {

 


  
  


  

  const data = await fetch (
  `${process.env.HOSTNAME}/api/profile/${id}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body : JSON.stringify(body)
  }
).then((response) => {
  return response.json();
})
}

const requestProfileUpdate2 = async(id) => {




  const data = await fetch (
    `${process.env.HOSTNAME}/api/profile/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  })
  }

  const requestProfileUpdateViewCount = async(id) => {

    const data = await fetch (
      `${process.env.HOSTNAME}/api/profile/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => {
      return response.json();
    })
    }


export default function CompetitionSearchPage({ data }) {
  const {data: user} =useSession
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {data: session} =useSession()
  const [editing, setEditing] = React.useState(false);

  const handleEditing = () => {
    setEditing(!editing);
  };

  return (
    <>
    {editing ? (
      <ProfilePublishedTab
      citizensValue={data[0]}
      handleEditing={handleEditing}
      />
    ) : (
    <Fragment>
      <Header/>
      <Link
      href={`${process.env.HOSTNAME}/profile/${router.query.id}`}
       prefetch
      passHref
     >
    <IconButton onClick={()=> 
      handlePublished(data[0].user_id)
      } 
      >
        <FavoriteIcon style={{ color: "red" }}/>
      </IconButton>
    </Link>
    <div>&nbsp;&nbsp;{data[0].profile.like_count}</div>
    <Card 
    contestID={data}
    handleEditing={handleEditing}
    />
    </Fragment>
    
    )
    }
    </>
  );
}

const handlePublished = async (data) => {
  await requestProfileUpdate2(data);
};

const handlePublishedViewCount = async (data) => {
  await requestProfileUpdateViewCount(data);
};

export async function getServerSideProps(context) {

  const {id} = context.query;

  const data = await fetch(
    `${process.env.HOSTNAME}/api/profile/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });

  handlePublishedViewCount(data[0].user_id);

  return { props: { data } };
}