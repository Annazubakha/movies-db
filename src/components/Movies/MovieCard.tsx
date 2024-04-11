import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo } from "react";

interface MovieCardProps {
  title: string;
  release_date: number;
  popularity: number;
  id: number;
  image?: string;
  enableUserActions?: boolean;
  onAddFavorite?(id: number): void;
}

function MovieCard({
  id,
  title,
  release_date,
  popularity,
  enableUserActions,
  image,
  onAddFavorite,
}: MovieCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography color="primary" variant="h5">
          {title}
        </Typography>
        <Typography color="secondary" sx={{ mt: 2 }}>
          Release date: {release_date}
        </Typography>
        <Typography color="secondary">Populrity: {popularity}</Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`movies/${id}`}
          sx={{
            "&:hover": {
              color: "#d0a4d8",
              backgroundColor: "purple",
            },
            "&:focus": {
              color: "#d0a4d8",
              backgroundColor: "purple",
            },
          }}
        >
          Details
        </Button>
        {enableUserActions && (
          <Tooltip title="Add to favorites">
            <IconButton
              onClick={() => onAddFavorite?.(id)}
              sx={{
                color: "#d0a4d8",
                "&:hover": {
                  color: "purple",
                },
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default memo(MovieCard);
