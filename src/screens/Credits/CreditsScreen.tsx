import React, { useCallback, useMemo } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PreviewList } from "../../components/Preview";
import { QueryContainer } from "../../components/QueryContainer";
import { useFetch } from "../../hooks";
import { Credit } from "../../models";
import { DiscoverParamList } from "../../navigation";
import { ViewPager } from "../../components/ViewPager";

export const CreditsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "CreditList">>();
  const { push } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const { isLoading, error, data, refresh } = useFetch<Credit>("MovieCredits", {
    movieId: id,
  });

  const onPress = useCallback(
    (id: number) => () => push("CreditDetails", { id }),
    [push]
  );

  const castPage = useMemo(() => {
    if (!data) return null;
    const cast = data.cast.map((cast) => ({
      imgUrl: cast.profilePath,
      title: cast.name,
      description: cast.character,
      onPress: onPress(cast.id),
    }));

    return {
      title: "Cast",
      component: <PreviewList data={cast} />,
    };
  }, [data, onPress]);

  const crewPage = useMemo(() => {
    if (!data) return null;
    const crew = data.crew.map((crew) => ({
      imgUrl: crew.profilePath,
      title: crew.name,
      description: crew.department,
      onPress: onPress(crew.id),
    }));

    return {
      title: "Crew",
      component: <PreviewList data={crew} />,
    };
  }, [data, onPress]);

  return (
    <QueryContainer
      wrapperStyle="unwrapped"
      isLoading={isLoading ?? false}
      isErrored={error !== undefined}
      onRetryQuery={refresh}
    >
      {castPage && crewPage && <ViewPager pages={[castPage, crewPage]} />}
    </QueryContainer>
  );
};
