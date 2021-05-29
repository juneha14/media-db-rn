import React, { useCallback, useMemo } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PreviewList, PreviewDataItem } from "../../components/Preview";
import { QueryContainer } from "../../components/QueryContainer";
import { useFetch } from "../../hooks";
import { Credit } from "../../models";
import { DiscoverParamList } from "../../navigation";

// View pager to handle both cast and credit
// Favourite routes also need the same screens as Discover routes - can we extract the common ones into a separate route?

export const CreditsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "CreditList">>();
  //   const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const { isLoading, error, data } = useFetch<Credit>("MovieCredits", {
    movieId: id,
  });

  const onPress = useCallback(
    (id: number) => () => {
      console.log("==== Value of id:", id);
    },
    []
  );

  const castPreview: PreviewDataItem[] = useMemo(() => {
    if (!data?.cast) return [];

    return data.cast.map((cast) => ({
      imgUrl: cast.profilePath,
      title: cast.name,
      description: cast.character,
      onPress: onPress(cast.id),
    }));
  }, [data?.cast, onPress]);

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading ?? false}
      isErrored={error !== undefined}
    >
      <PreviewList data={castPreview} />
    </QueryContainer>
  );
};
