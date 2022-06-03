import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tag from "./Tag";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({ tags, type, form, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        flexDirection: "row",
      }}
      component="ul"
    >
      {tags.length !== 0
        ? tags.map((data) => {
            return (
              <ListItem key={data.id}>
                <Tag
                  name={data.name}
                  type={type}
                  form={form}
                  team={data.team}
                  role={data.id}
                />
              </ListItem>
            );
          })
        : null}
      {children}
    </Box>
  );
}
