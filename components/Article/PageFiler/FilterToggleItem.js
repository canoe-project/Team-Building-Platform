import { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = {};

const useStyles = makeStyles(styles);

const FilterToggleItem = ({ label, handleToggleClick, clickLabel }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Fragment>
      <Chip
        label={click ? clickLabel : label}
        onClickCapture={() => {
          if (handleToggleClick !== undefined) {
            handleToggleClick(!click);
          }
          setClick(!click);
        }}
        {...(click ? {} : { variant: "outlined" })}
      ></Chip>
    </Fragment>
  );
};

export default FilterToggleItem;
