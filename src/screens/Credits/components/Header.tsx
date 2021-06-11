import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../../../components/Avatar";
import { Box } from "../../../components/Box";
import { SocialMediaLink } from "../../../components/Icons";
import { Colors, Spacing } from "../../../components/theme";
import { About } from "./About";
import { SocialMediaLinks } from "../utils";

interface HeaderProps {
  imgUrl: string | null;
  name: string;
  department?: string;
  socialMediaLinks: SocialMediaLinks;
  biography: string;
  birthday: string | null;
  birthPlace: string | null;
  popularity: number;
  onSocialMediaLinkPress: (url: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  imgUrl,
  name,
  department,
  socialMediaLinks,
  biography,
  birthday,
  birthPlace,
  popularity,
  onSocialMediaLinkPress,
  style,
}) => {
  const { top } = useSafeAreaInsets();

  const onLinkPress = useCallback(
    (url: string) => {
      onSocialMediaLinkPress(url);
    },
    [onSocialMediaLinkPress]
  );

  return (
    <Box style={[styles.container, { paddingTop: top }, style]}>
      <Avatar
        url={imgUrl}
        size={120}
        title={name}
        subtitle={department}
        textPosition="bottom"
      />
      <Box style={styles.socialMediaContainer}>
        {socialMediaLinks.map(({ type, url }) => {
          return (
            <SocialMediaLink
              key={type}
              style={styles.socialMedia}
              type={type}
              url={url}
              onPress={onLinkPress}
            />
          );
        })}
      </Box>
      {biography.length > 0 && birthday && birthPlace && (
        <About
          style={styles.about}
          biography={biography}
          birthday={birthday}
          birthPlace={birthPlace}
          popularity={popularity}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.m,
    backgroundColor: Colors.SurfaceForeground,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: Spacing.l,
  },
  socialMedia: {
    justifyContent: "center",
    alignItems: "center",
  },
  about: {
    paddingHorizontal: Spacing.defaultMargin,
    marginTop: Spacing.l,
  },
});
