import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../utils/AuthContext";

interface AuthSectionProp {
  onLogin(): void;
  onLogout(): void;
}
export const AuthSection = ({ onLogin, onLogout }: AuthSectionProp) => {
  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== anonymousUser;

  if (loggedIn) {
    return (
      <>
        <Typography
          sx={{
            fontSize: "20px",
          }}
        >
          Hi, {auth.user.name}!
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          sx={{
            "&:hover": {
              color: "purple",
              backgroundColor: "#d0a4d8",
            },
            "&:focus": {
              color: "purple",
              backgroundColor: "#d0a4d8",
            },
          }}
          onClick={onLogout}
        >
          Log Out
        </Button>
      </>
    );
  }
  return (
    <Button
      color="inherit"
      variant="outlined"
      sx={{
        "&:hover": {
          color: "purple",
          backgroundColor: "#d0a4d8",
        },
        "&:focus": {
          color: "purple",
          backgroundColor: "#d0a4d8",
        },
      }}
      onClick={onLogin}
    >
      Log In
    </Button>
  );
};
