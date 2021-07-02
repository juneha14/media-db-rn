import React, { useCallback } from "react";
import { QueryContainer } from "../../components/QueryContainer";
import { PreviewList } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { useAppStackNavigation, useFetch, useRouteParams } from "../../hooks";
import { Movie, PaginatedResponse } from "../../models";

export const RecommendedScreen: React.FC = () => {
  const {
    params: { id },
  } = useRouteParams<"RecommendedList">();
  const { push } = useAppStackNavigation();

  const { isLoading, error, data, refresh } = useFetch<
    PaginatedResponse<Movie[]>
  >("MovieRecommendations", { movieId: id });

  const onSelectMovie = useCallback(
    (id: number) => () => push("MediaDetails", { id }),
    [push]
  );

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading}
      isErrored={error !== undefined}
      onRetryQuery={refresh}
    >
      <PreviewList
        data={data?.results.map((movie) => ({
          title: movie.title,
          description: movie.releaseDate,
          imgUrl: movie.posterPath,
          rightAccessory: <Rating rating={movie.voteAverage} />,
          onPress: onSelectMovie(movie.id),
        }))}
      />
    </QueryContainer>
  );
};
