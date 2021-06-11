import React, { useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DiscoverParamList } from "../../navigation";
import { QueryContainer } from "../../components/QueryContainer";
import { PreviewList } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { useFetch } from "../../hooks";
import { Movie, PaginatedResponse } from "../../models";

export const RecommendedScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "RecommendedList">>();
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

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
