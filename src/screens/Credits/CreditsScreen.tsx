import React, { useCallback, useMemo } from "react";
import { PreviewList } from "../../components/Preview";
import { QueryContainer } from "../../components/QueryContainer";
import { useAppStackNavigation, useFetch, useRouteParams } from "../../hooks";
import { Credit } from "../../models";
import { ViewPager } from "../../components/ViewPager";
import { Colors } from "../../components/theme";

export const CreditsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRouteParams<"CreditList">();
  const { push } = useAppStackNavigation();

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
      {castPage && crewPage && (
        <ViewPager
          style={{ backgroundColor: Colors.SurfaceBackground }}
          pages={[castPage, crewPage]}
        />
      )}
    </QueryContainer>
  );
};
