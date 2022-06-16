/*
정도현
*/

import moment from "moment";
import { Fragment, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export default function CustomizedProgressBars({ start_period, end_period }) {
  const [timeTotal, setTimeTotal] = useState(100);
  const [timeLeft, setTimeLeft] = useState(1);

  useEffect(() => {
    setTimeTotal(end_period.getTime() / 1000 - start_period.getTime() / 1000);
    setTimeLeft(end_period.getTime() / 1000 - new Date().getTime() / 1000);

    // console.log(end_period.getTime() / 1000 - new Date().getTime() / 1000);
    // console.log(new Date().getTime());
    // console.log(start_period.getTime());
    // console.log(end_period.getTime());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress
        variant="determinate"
        value={Math.abs((timeLeft / timeTotal) * 100)}
      />
    </Box>
  );
}
