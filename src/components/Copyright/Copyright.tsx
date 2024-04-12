import { Typography } from "@mui/material";
export const Copyright = () => {
  return (
    <Typography variant="h6" align="center" color="secondary">
      Copyright &#169; The Movies DB, {new Date().getFullYear()}
    </Typography>
  );
};
