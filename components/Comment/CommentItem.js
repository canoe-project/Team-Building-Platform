/*
정도현
*/


import { useState, useEffect } from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import Parser from "html-react-parser";
import Link from "next/link";
const commentItem = ({ avatar, author, createAt, body }) => {
  return (
    <Comment>
      <Link Link href={`/profile/${author}`} passHref>
        <Comment.Avatar src={avatar} />
      </Link>
      <Comment.Content>
        <Link Link href={`/profile/${author}`} passHref>
          <Comment.Author as="a">{author}</Comment.Author>
        </Link>
        <Comment.Metadata>
          <div>{createAt}</div>
        </Comment.Metadata>
        <Comment.Text>{Parser(body)}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default commentItem;
