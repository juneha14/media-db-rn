import React, { useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../theme";
import { Icon, IconName, IconSize } from "./Icon";
import { noop } from "lodash";

export type SocialMedia = "twitter" | "instagram" | "facebook";

interface SocialMediaLinkProps {
  type: SocialMedia;
  url: string;
  size?: IconSize;
  onPress?: (url: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialMediaLink: React.FC<SocialMediaLinkProps> = React.memo(
  ({ type, url, size = "medium", onPress, style }) => {
    const onPressed = useCallback(
      (url: string) => () => {
        onPress ? onPress(url) : noop;
      },
      [onPress]
    );

    return (
      <Pressable style={style} onPress={onPressed(url)}>
        <Icon
          name={iconNameForType[type]}
          size={size}
          color={Colors.IconInteractive}
        />
      </Pressable>
    );
  }
);

const iconNameForType: Record<SocialMedia, IconName> = {
  twitter: "ios-logo-twitter",
  instagram: "ios-logo-instagram",
  facebook: "ios-logo-facebook",
};
