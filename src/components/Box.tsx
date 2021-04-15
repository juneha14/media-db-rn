import React from "react";
import { View } from "react-native";

type BoxProps = React.ComponentProps<typeof View> & {
  children?: React.ReactNode;
} & { id?: string };

export const Box: React.FC<BoxProps> = ({ style, ...rest }) => {
  return <View style={style} {...rest} />;
};
