import React from "react";
import { BackArrow } from "../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BackNavigationButtonProps {
  onNavigateBack?: () => void;
}

export const BackNavigationButton: React.FC<BackNavigationButtonProps> = ({
  onNavigateBack,
}) => {
  const { top, left } = useSafeAreaInsets();
  return (
    <BackArrow
      style={{ position: "absolute", left: left + 15, top, zIndex: 100 }}
      size="large"
      onPress={onNavigateBack}
    />
  );
};
