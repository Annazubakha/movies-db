import { fetchNextPage, resetMovies } from "../../reducers/moviesSlice";
import { MovieCard } from "./MovieCard";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Filters, MoviesFilter } from "../MoviesFilter/MoviesFilter";

export function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const [filters, setFilters] = useState<Filters>();

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            keywords: filters?.keywords.map((k) => k.id),
            genres: filters?.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap", py: 12 }}>
      <Grid item xs="auto">
        <MoviesFilter
          onApply={(filters) => {
            dispatch(resetMovies());
            setFilters(filters);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4 }}
            color="primary"
          >
            Movies list
          </Typography>
          {!loading && !movies.length && (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ color: "#f15050" }}>
                We couldn't find any movies based on your query. Please try
                another filters.
              </Typography>
              <img
                style={{
                  marginTop: "20px",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
                width="500px"
                src="https://images.unsplash.com/photo-1556091674-a6a6e6504956?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="cinema"
              />
            </div>
          )}
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
      </Grid>
    </Grid>
  );
}

// const mapStateToProps = (state: RootState) => ({
//   movies: state.movies.top,
//   loading: state.movies.loading,
//   hasMorePages: state.movies.hasMorePages,
// });
// const connector = connect(mapStateToProps);

export default Movies;
