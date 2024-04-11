import MovieCard from "./MovieCard";
import { useCallback, useContext, useState } from "react";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import MoviesFilter from "../MoviesFilter/MoviesFilter";
import {
  MoviesFilters,
  MoviesQuery,
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from "../../services/tmdb";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

export default function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);
  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(path?: string) {
    return path && configuration
      ? `${configuration?.images.base_url}w780${path}`
      : undefined;
  }

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;
  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);
  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented! Action: ${user.name} is adding movie ${id} to favorites.`
      );
    },
    [user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap", py: 12 }}>
      <Grid item xs="auto">
        <MoviesFilter
          onApply={(filters) => {
            const moviesFilters: MoviesFilters = {
              keywords: filters.keywords.map((k) => k.id),
              genres: filters.genres,
            };
            setQuery({
              page: 1,
              filters: moviesFilters,
            });
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
          {!isFetching && !movies.length && (
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
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={m.id}
                  key={m.id}
                  title={m.title}
                  release_date={m.release_date}
                  popularity={m.popularity}
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
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
