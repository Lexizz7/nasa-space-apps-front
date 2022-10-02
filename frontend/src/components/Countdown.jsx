import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const timeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return midnight - now;
};

const Countdown = () => {
  const [timer, setTimer] = useState(timeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="body2" sx={{ margin: 0 }}>
      {new Date(timer).toISOString().substr(11, 8)}
    </Typography>
  );
};

export default Countdown;
