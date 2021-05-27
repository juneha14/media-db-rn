import React, { useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DiscoverParamList } from "../../navigation";
import { PreviewList } from "../../components/Preview";
import { Rating } from "../../components/Rating";

export const RecommendedScreen: React.FC = () => {
  const {
    params: { recommended },
  } = useRoute<RouteProp<DiscoverParamList, "RecommendedList">>();
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const onSelectMovie = useCallback(
    (id: number) => () => push("MediaDetails", { id }),
    [push]
  );

  return (
    <PreviewList
      data={recommended.map((movie) => ({
        title: movie.title,
        description: movie.releaseDate,
        imgUrl: movie.posterPath,
        rightAccessory: <Rating rating={movie.voteAverage} />,
        onPress: onSelectMovie(movie.id),
      }))}
    />
  );
};
