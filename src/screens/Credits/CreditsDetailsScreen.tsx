import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { Header } from "./components/Header";
import { KnownForList } from "./components/KnownForList";
import { useCreditDetails } from "./useCreditDetails";
import { Section } from "../../components/Section";
import { Spacing } from "../../components/theme";
import { QueryContainer } from "../../components/QueryContainer";
import { BackNavigationButton } from "../shared";

export const CreditsDetailsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "CreditDetails">>();
  const { push, pop } = useNavigation<StackNavigationProp<DiscoverParamList>>();

  const {
    loading,
    error,
    personDetails,
    socialMediaLinks,
    knownForMedia,
    refetch,
  } = useCreditDetails(id);

  const onNavigateBack = useCallback(() => pop(), [pop]);
  const onSelectMedia = useCallback(
    (id: number) => push("MediaDetails", { id }),
    [push]
  );
  const onSelectSocialMediaLink = useCallback(
    (url: string) => WebBrowser.openBrowserAsync(url),
    []
  );
  const onSelectSeeAllKnownForMedia = useCallback(() => {
    if (knownForMedia) push("CreditKnownForList", { media: knownForMedia });
  }, [push, knownForMedia]);

  return (
    <>
      <BackNavigationButton onNavigateBack={onNavigateBack} />
      <QueryContainer
        wrapperStyle="wrapped"
        isLoading={loading}
        isErrored={error !== undefined}
        onRetryQuery={refetch}
      >
        {personDetails && socialMediaLinks && knownForMedia && (
          <>
            <Header
              imgUrl={personDetails.profilePath}
              name={personDetails.name}
              department={personDetails.knownForDepartment}
              socialMediaLinks={socialMediaLinks}
              biography={personDetails.biography}
              birthday={personDetails.birthday}
              birthPlace={personDetails.placeOfBirth}
              popularity={personDetails.popularity}
              onSocialMediaLinkPress={onSelectSocialMediaLink}
            />
            <Section
              style={styles.knownFor}
              title="Known for"
              accessoryTitle={knownForMedia.length > 3 ? "See all" : undefined}
              onAccessoryPress={onSelectSeeAllKnownForMedia}
            >
              <KnownForList
                media={knownForMedia ?? []}
                onSelectMedia={onSelectMedia}
              />
            </Section>
          </>
        )}
      </QueryContainer>
    </>
  );
};

const styles = StyleSheet.create({
  knownFor: {
    padding: Spacing.defaultMargin,
  },
});
