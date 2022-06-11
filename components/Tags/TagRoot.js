import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export default function ChipsArray({ children, className }) {
  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        flexDirection: "row",
      }}
      component="ul"
    >
      {children}
    </Box>
  );
}
