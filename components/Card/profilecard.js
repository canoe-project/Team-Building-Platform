import Head from "next/head";
import Link from "next/link";
import React from "react";
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Typography} from '@mui/material';
import styles from "../../styles/Home.module.css";
import css from "styled-jsx/css";
import Image from "next/image";
const imgType = { png: ".png" };
var simbolImageAddress = "/asset/simbol";
var skillStackAddress = "/asset/skillStack";
var profilePhotoAddress = "/asset/profilePhoto";
var estimateAddress = "/asset/estimate_";

const style = css`
  .test {
    background-color: white;
    height: 60px;
    font-size: 4rem;
  }
`;

const Pcard = (props) => {
  

  const photosize = 50

  return (
    <>
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
            <ListItem>
        <ListItemAvatar>
    <Avatar  alt="Picture of me" src={`${profilePhotoAddress}${props.myPhoto}${imgType.png}`} />
    </ListItemAvatar>
    </ListItem>
            <ListItem>
        <ListItemAvatar>
        <Avatar  alt="Picture of the author" src={`${simbolImageAddress}${props.myField}${imgType.png}`} />
        </ListItemAvatar>
        <ListItemText primary="내 분야"/>
      </ListItem>
      <ListItem>
        <ListItemText primary="자기소개" secondary={props.explan}/>
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          개인정보
        </Typography>
      </li>

      <ListItem>
        <ListItemText primary="이름" secondary={props.name}/>
      </ListItem>
      <ListItem>
        <ListItemText primary="주소" secondary={props.address}/>
      </ListItem>
      <ListItem>
        <ListItemText primary="연락처" secondary={props.contactAddress}/>
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          기술스택
        </Typography>
      </li>
      <header>
        <Image
          src={`${skillStackAddress}${props.skillStack[0]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        <Image
          src={`${skillStackAddress}${props.skillStack[1]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        <Image
          src={`${skillStackAddress}${props.skillStack[2]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        <Image
          src={`${skillStackAddress}${props.skillStack[3]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
      </header>
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          타인평가
        </Typography>
      </li>
      <header>
        <Image
          src={`${estimateAddress}${props.myEstimate[0]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        <Image
          src={`${estimateAddress}${props.myEstimate[1]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        <Image
          src={`${estimateAddress}${props.myEstimate[2]}${imgType.png}`}
          alt="이미지"
          width={photosize}
          height={photosize}
        />
        </header>
    <style jsx>{style}</style>
    </List>
    </>
  );
};

export default Pcard;