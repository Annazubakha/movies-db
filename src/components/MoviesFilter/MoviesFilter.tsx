import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  debounce,
  Skeleton,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { KeywordItem } from "../../api/tmdb";
import { useMemo, useState } from "react";
import { useGetKeywordsQuery, useGetGenresQuery } from "../../api/tmdb";

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}
const MoviesFilter = ({ onApply }: MoviesFilterProps) => {
  const [keywordsQuery, setKeywordsQuery] = useState<string>("");
  const { data: keywordsOptions = [], isLoading: keywordsLoading } =
    useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  const { control, handleSubmit, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const debouncedFetchKeyWords = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          color="primary"
          component="fieldset"
          variant="standard"
          sx={{
            m: 2,
            display: "block",
          }}
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, value) => onChange(value)}
                onInputChange={(_, value) => debouncedFetchKeyWords(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 2, display: "block" }}
          component="fieldset"
          variant="standard"
        >
          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
              <FormLabel component="legend" color="primary">
                Genres
              </FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <>
                      {genres.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={field.value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  field.onChange([...field.value, valueNumber]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (value) => value !== valueNumber
                                    )
                                  );
                                }
                              }}
                            />
                          }
                          label={genre.name}
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>
          )}
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          startIcon={<FilterAltOutlined />}
          sx={{ m: 2 }}
          disabled={!formState.isDirty}
        >
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};

export default MoviesFilter;
