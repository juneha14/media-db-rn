import React, { useCallback } from "react";
import { PreviewList } from "../../components/Preview";
import { Rating } from "../../components/Rating";
import { useAppStackNavigation, useRouteParams } from "../../hooks";

export const CreditsKnownForScreen: React.FC = () => {
  const {
    params: { media },
  } = useRouteParams<"CreditKnownForList">();
  const { push } = useAppStackNavigation();

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
