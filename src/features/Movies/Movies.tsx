import { FEtchNextPage, Movie } from "../../reducers/moviesSlice";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import { useContext, useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
  hasMorePages: boolean;
}
export function Movies({ movies, loading, hasMorePages }: MoviesProps) {
  const dispatch = useAppDispatch();

  // const movies = useAppSelector((state) => state.movies.top);
  // const loading = useAppSelector((state) => state.movies.loading);
  // const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      dispatch(FEtchNextPage());
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages]);

  return (
    <Container sx={{ py: 15 }} maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mb: 4 }} color="primary">
        Now playing movies
      </Typography>

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
      <div ref={targetRef}>
        {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
      </div>
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
  hasMorePages: state.movies.hasMorePages,
});
const connector = connect(mapStateToProps);

export default connector(Movies);
