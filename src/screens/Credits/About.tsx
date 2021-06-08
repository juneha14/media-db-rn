import React, { useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Box } from "../../components/Box";
import { Colors, Spacing } from "../../components/theme";
import { Text } from "../../components/Typography";

interface AboutProps {
  biography: string;
  birthday: string;
  birthPlace: string;
  popularity: number;
  style?: StyleProp<ViewStyle>;
}

export const About: React.FC<AboutProps> = ({
  biography,
  birthday,
  birthPlace,
  popularity,
  style,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Box style={style}>
      <Text variant="body" numberOfLines={collapsed ? 2 : 0}>
        {biography}
      </Text>
      {!collapsed ? (
        <Box style={styles.about}>
          <ShortInfo title="Birthday" description={birthday} showDivider />
          <ShortInfo
            title="Place of birth"
            description={birthPlace}
            showDivider
          />
          <ShortInfo
            title="Popularity"
            description={String(popularity)}
            showDivider={false}
          />
        </Box>
      ) : null}
      <Pressable
        style={styles.showMore}
        onPress={() => setCollapsed((collapsed) => !collapsed)}
      >
        <Text variant="body" color={Colors.TextInteractive}>
          {collapsed ? "Show more" : "Show less"}
        </Text>
      </Pressable>
    </Box>
  );
};

const ShortInfo = ({
  title,
  description,
  showDivider,
}: {
  title: string;
  description: string;
  showDivider: boolean;
}) => {
  return (
    <Box
      style={[
        styles.shortInfo,
        {
          borderRightWidth: showDivider ? 1 : undefined,
          borderRightColor: showDivider ? Colors.Border : undefined,
        },
      ]}
    >
      <Text style={{ marginBottom: Spacing.s }} variant="body">
        {title}
      </Text>
      <Text
        style={{ textAlign: "center" }}
        variant="body"
        color={Colors.TextSubdued}
      >
        {description}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  about: {
    flexDirection: "row",
    marginTop: Spacing.l,
  },
  shortInfo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  showMore: {
    marginTop: Spacing.m,
  },
});
