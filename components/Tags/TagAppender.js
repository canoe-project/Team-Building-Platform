/*
정도현
*/


import Button from "../CustomButtons/Button";
import { useEffect, useState } from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";
const componentLabels = {
  button: "add tag",
};

const TagAppender = ({ tag = [], handle }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  useEffect(() => {}, [tag]);

  if (loading) return <div>loading</div>;
  return (
    <GridContainer>
      <GridItem>
        <Autocomplete
          multiple
          id="tags-filled"
          options={tag}
          getOptionLabel={(option) => {
            return option.name;
          }}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
          onChange={handle}
        />
      </GridItem>
    </GridContainer>
  );
};

export default TagAppender;
