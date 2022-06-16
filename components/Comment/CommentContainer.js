/*
정도현
*/


import { useState, useEffect } from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { Button, Comment, Form, Header } from "semantic-ui-react";
const CommentContainer = ({ children }) => {
  return <Comment.Group>{children}</Comment.Group>;
};

export default CommentContainer;
