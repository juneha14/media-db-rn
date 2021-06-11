import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiscoverParamList } from "../../navigation";
import { Header } from "./Header";
import { KnownForList } from "./KnownForList";
import { useCreditDetails } from "./useCreditDetails";
import { Section } from "../../components/Section";
import { Spacing } from "../../components/theme";
import { QueryContainer } from "../../components/QueryContainer";
import { BackNavigationButton } from "../shared";

// black background and each section that has different color that stretches all the way but with its own padding
// generic screen to show list of content preview items
// query container error state does not have navigation back
// retry when error container is shown

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

  return (
    <>
      <BackNavigationButton onNavigateBack={onNavigateBack} />
      <QueryContainer
        wrapperStyle="wrapped"
        isLoading={loading}
        isErrored={error !== undefined}
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
              onAccessoryPress={() =>
                console.log(
                  "========== File: CreditsDetailsScreen.tsx, Line: 65 =========="
                )
              }
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
