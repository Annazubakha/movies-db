import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";

const CountdownText = () => {
  const [countdown, setCountDown] = useState(60);
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
    <Typography variant="h3" align="center" color="primary" sx={{ mb: 2 }}>
      Coming soon: {countdown}
    </Typography>
  );
};

export default CountdownText;
