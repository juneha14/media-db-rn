import React, { useCallback } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { PreviewList } from "../../components/Preview";
import { Rating } from "../../components/Rating";

export const CreditsKnownForScreen: React.FC = () => {
  const {
    params: { media },
  } = useRoute<RouteProp<DiscoverParamList, "CreditKnownForList">>();
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const onPress = useCallback(
    (id: number) => () => push("MediaDetails", { id }),
    [push]
  );

  return (
    <PreviewList
      data={media.map((item) => {
        return {
          imgUrl: item.posterPath,
          title: item.title,
          description: item.releaseDate,
          rightAccessory: <Rating rating={item.voteAverage} />,
          onPress: onPress(item.id),
        };
      })}
    />
  );
};
