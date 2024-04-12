import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, CardActions, Container, Typography } from "@mui/material";

import { AuthContext, anonymousUser } from "../../utils/AuthContext";
import { Copyright } from "../../components/Copyright/Copyright";

export const Home = () => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const greeting = loggedIn
    ? `${user.name}, let's watch movies together`
    : "Let's watch movies together";

  return (
    <Container
      sx={{
        py: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      maxWidth="lg"
    >
      <Typography variant="h3" align="center" sx={{ mb: 4 }} color="primary">
        Welcome to the Movies DB!
      </Typography>
      <img
        style={{ marginBottom: "20px", borderRadius: "20px" }}
        width="600px"
        src="https://images.unsplash.com/photo-1587986100063-d1c34ca3dc6b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="cinema"
      />
      <Typography variant="h4" align="center" sx={{ mb: 2 }} color="primary">
        {greeting}
      </Typography>
      <CardActions>
        <Button
          component={RouterLink}
          to={`movies`}
          sx={{
            height: "40px",
            width: "200px",
            mb: 2,
            color: "#d0a4d8",
            backgroundColor: "purple",
            "&:focus": {
              color: "purple",
              backgroundColor: "#d0a4d8",
            },
            "&:hover": {
              color: "purple",
              backgroundColor: "#d0a4d8",
            },
          }}
        >
          Go to movies
        </Button>
      </CardActions>
      <Copyright />
    </Container>
  );
};
