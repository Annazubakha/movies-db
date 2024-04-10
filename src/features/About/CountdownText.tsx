import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const CountdownText = () => {
  const [countdown, setCountDown] = useState(9);
  const intervalRef = useRef<any>();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountDown((value) => value - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
  });

  return (
    <Typography variant="h4" align="center">
      Coming soon: {countdown}
    </Typography>
  );
};

export default CountdownText;
