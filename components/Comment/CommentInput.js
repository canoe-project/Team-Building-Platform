import Editor from "../Editors/CKEditorTextEditor";
import { useRouter } from "next/router";
import Button from "../CustomButtons/Button";
import { useState, useEffect, useReducer, Fragment } from "react";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton } from "@material-ui/core";
import { Box } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
const reqCommentPost = async (articleID, comment, userId) => {
  const body = {
    comment: {
      create: {
        body: comment,
        likeCount: 0,
        citizens: {
          connect: {
            user_id: userId,
          },
        },
      },
    },
  };
  const data = await fetch(
    `${process.env.HOSTNAME}/api/comment/${articleID}/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then(async (response) => {
    return await response.json();
  });
  return data;
};
const styles = {
  filed: {
    width: "100%",
    alignSelf: "center",
  },
  box: {
    display: "flex",
  },
};

const useStyles = makeStyles(styles);

const CommentInput = ({ className }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");

  const onChangeHandle = (data) => {
    setComment(data);
  };
  useEffect(() => {}, [comment]);
  return (
    <Box className={classes.box}>
      <TextField
        className={classes.filed}
        onChangeCapture={(e) => {
          onChangeHandle(e.target.value);
        }}
        fullWidth
      ></TextField>
      <IconButton
        onClick={async () => {
          await reqCommentPost(router.query.id, comment, session.user.id).then(
            () => {
              router.reload(window.location.pathname);
            }
          );
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default CommentInput;
