import React, { useCallback } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Avatar } from "../../components/Avatar";
import { Box } from "../../components/Box";
import { SocialMedia, SocialMediaLink } from "../../components/Icons";
import { Colors, Spacing } from "../../components/theme";

interface HeaderProps {
  imgUrl: string | null;
  title: string;
  subtitle?: string;
  socialMediaLinks: { type: SocialMedia; url: string | null }[];
  onSocialMediaLinkPress: (url: string | null) => void;
  style?: StyleProp<ViewStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  imgUrl,
  title,
  subtitle,
  socialMediaLinks,
  onSocialMediaLinkPress,
  style,
}) => {
  const onLinkPress = useCallback(
    (url: string | null) => () => {
      onSocialMediaLinkPress(url);
    },
    [onSocialMediaLinkPress]
  );

  return (
    <Box style={[styles.container, style]}>
      <Avatar
        url="/yzfxLMcBMusKzZp9f1Z9Ags8WML.jpg"
        size={120}
        title={title}
        subtitle={subtitle}
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
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SurfaceForeground,
  },
  socialMediaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.l,
  },
  socialMedia: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
