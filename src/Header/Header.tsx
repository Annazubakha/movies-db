import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Link, Box } from "@mui/material";
import { ReactNode } from "react";
import { AuthSection } from "../AuthSection/AuthSection";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";

function HeaderLink({ children, to }: { to: string; children: ReactNode }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{
        fontWeight: 400,
        fontSize: 24,
        textDecoration: "none",
        "&:hover": {
          color: "#d0a4d8",
        },
        "&:focus": {
          color: "#d0a4d8",
        },
      }}
    >
      {children}
    </Link>
  );
}

interface HeaderProps {
  onLogin(): void;
  onLogout(): void;
}
export const Header = ({ onLogin, onLogout }: HeaderProps) => {
  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <ConnectedTvIcon
              sx={{
                fontSize: "36px",
              }}
            />
            <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <HeaderLink to="/">Home</HeaderLink>
              <HeaderLink to="/movies">Movies</HeaderLink>
              <HeaderLink to="/about">About</HeaderLink>
            </nav>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              fontSize: "80px",
              alignItems: "center",
            }}
          >
            <AuthSection onLogin={onLogin} onLogout={onLogout} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
