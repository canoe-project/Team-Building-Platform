/*
정도현
*/


import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "../../svg/header/group.svg";
import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@mui/material/Fade";
import SearchBar from "../SearchBar/SearchBar";
const styles = {
  iconSize: {
    width: "3rem",
    height: "3rem",
    padding: "0.5rem",
  },
  svg: {
    flex: "auto",
  },
  item: {
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
  menu: {
    marginBottom: "auto",
  },
};
const pageLabels = {
  menuProfileLink: "프로필",
  meunLogout: "로그아웃",
};
const useStyles = makeStyles(styles);

const Header = () => {
  const { data: session, status } = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const isActive = (pathname) => router.pathname === pathname;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupIcon = () => {
    router.push("/group");
  };
  let left = (
    <div className="left">
      <Link href="/" passHref>
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" passHref>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    left = (
      <div className="left">
        <Link href="/" passHref>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/contest" passHref>
          <a data-active={isActive("/drafts")}>대회</a>
        </Link>
        <Link href="/partner" passHref>
          <a data-active={isActive("/drafts")}>파트너</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <Link href="/api/auth/signin" passHref>
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" passHref>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/contest" passHref>
          <a data-active={isActive("/drafts")}>대회</a>
        </Link>
        <Link href="/partner" passHref>
          <a data-active={isActive("/drafts")}>파트너</a>
        </Link>

        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <IconButton
          className={classes.iconSize + " " + classes.item}
          onClick={handleGroupIcon}
        >
          <GroupIcon className={classes.svg} />
        </IconButton>

        <Avatar
          className={classes.item}
          src={session.user.image}
          onClick={handleClick}
        ></Avatar>
        <Menu
          id="header-profile-menu"
          className={classes.menu}
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem key={"menuProfileLink"} onClick={handleClose}>
            <Link href="/profile">{pageLabels.menuProfileLink}</Link>
          </MenuItem>
          <MenuItem key={"meunLogout"} onClick={signOut}>
            {pageLabels.meunLogout}
          </MenuItem>
        </Menu>

        <style jsx>{`
          div {
            flex-direction: row;
            display: flex;
          }
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 1rem;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      <SearchBar />
      {right}

      <style jsx>{`
        nav {
          height: 4rem;
          display: flex;
          padding: 0.5rem;
          align-items: center;
          border-bottom: solid 0.5px #ececec;
          color: #928f96;
        }
      `}</style>
    </nav>
  );
};

export default Header;
