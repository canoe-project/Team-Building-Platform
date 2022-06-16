/*
정도현
*/


import Header from "../header/Header";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&family=Nanum+Gothic:wght@400;700;800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Box sx={{ mx: 9.125 }}>
        <CssBaseline />
        {children}
      </Box>
    </Fragment>
  );
};

export default Layout;
