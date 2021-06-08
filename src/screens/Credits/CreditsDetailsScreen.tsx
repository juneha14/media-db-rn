import React from "react";
import { StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DiscoverParamList } from "../../navigation";
import { Header } from "./Header";
import { About } from "./About";
import { KnownForList } from "./KnownForList";
import { useCreditDetails } from "./useCreditDetails";
import { Section } from "../../components/Section";
import { Colors, Spacing } from "../../components/theme";
import { QueryContainer } from "../../components/QueryContainer";
import { Container } from "../../components/Container";

// black background and each section that has different color that stretches all the way but with its own padding

export const CreditsDetailsScreen: React.FC = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<DiscoverParamList, "CreditDetails">>();

  const {
    loading,
    error,
    personDetails,
    socialMediaLinks,
    knownForMedia,
  } = useCreditDetails(id);

  return (
    <QueryContainer
      wrapperStyle="wrapped"
      isLoading={loading}
      isErrored={error !== undefined}
    >
      {personDetails && socialMediaLinks && knownForMedia && (
        <Container
          ignoreTopPadding
          onNavigateBack={() =>
            console.log(
              "========== File: CreditsDetailsScreen.tsx, Line: 37 =========="
            )
          }
        >
          <Header
            imgUrl={personDetails.profilePath}
            title={personDetails.name}
            subtitle={personDetails.knownForDepartment}
            socialMediaLinks={socialMediaLinks}
            onSocialMediaLinkPress={() =>
              console.log(
                "========== File: CreditsDetailsScreen.tsx, Line: 29 =========="
              )
            }
          />
          {personDetails.biography.length > 0 &&
          personDetails.placeOfBirth &&
          personDetails.birthday ? (
            <Section style={styles.about} title="About">
              <About
                biography={personDetails.biography}
                birthPlace={personDetails.placeOfBirth}
                birthday={personDetails.birthday}
                popularity={personDetails.popularity}
              />
            </Section>
          ) : null}
          <Section
            style={styles.knownFor}
            title="Known for"
            accessoryTitle={knownForMedia ? "See all" : undefined}
            onAccessoryPress={() =>
              console.log(
                "========== File: CreditsDetailsScreen.tsx, Line: 65 =========="
              )
            }
          >
            <KnownForList
              media={knownForMedia ?? []}
              onSelectMedia={() =>
                console.log(
                  "========== File: CreditsDetailsScreen.tsx, Line: 66 =========="
                )
              }
            />
          </Section>
        </Container>
      )}
    </QueryContainer>
  );
};

const styles = StyleSheet.create({
  about: {
    marginTop: Spacing.l,
    backgroundColor: Colors.SurfaceForeground,
  },
  knownFor: {
    marginTop: Spacing.l,
    backgroundColor: Colors.SurfaceForeground,
  },
});
