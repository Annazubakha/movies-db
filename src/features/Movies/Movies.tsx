import { Movie, fetchMovies } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}
export function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container sx={{ py: 15 }} maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mb: 4 }} color="primary">
        Now playing movies
      </Typography>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map((m) => (
            <Grid item key={m.id} xs={12} sm={6} md={4}>
              <MovieCard
                id={m.id}
                key={m.id}
                title={m.title}
                release_date={m.release_date}
                popularity={m.popularity}
                image={m.image}
                enableUserActions={loggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});
const connector = connect(mapStateToProps);

export default connector(Movies);
