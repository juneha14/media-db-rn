import React from "react";
import { BackArrow, CancelIcon } from "../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleProp, ViewStyle } from "react-native";

interface BackNavigationButtonProps {
  type?: "back" | "cancel";
  respectsTopInset?: boolean;
  onNavigateBack?: () => void;
}

export const BackNavigationButton: React.FC<BackNavigationButtonProps> = ({
  type = "back",
  respectsTopInset = true,
  onNavigateBack,
}) => {
  const { top, left } = useSafeAreaInsets();
  const style: StyleProp<ViewStyle> = {
    position: "absolute",
    left: left + 15,
    top: respectsTopInset ? top : 15,
    zIndex: 100,
  };

  if (type === "back")
    return <BackArrow style={style} size="large" onPress={onNavigateBack} />;

  return <CancelIcon style={style} size="large" onPress={onNavigateBack} />;
};
