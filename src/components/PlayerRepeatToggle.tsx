import { colors } from "@/constants/token";
import { useTrackPlayerRepeatMode } from "@/hooks/useTrackPlayerRepeatMode";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RepeatMode } from "@rntp/player";
import { ComponentProps } from "react";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const repeatOrder = [RepeatMode.Off, RepeatMode.One, RepeatMode.All] as const;

export const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
  const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();

  const toggleRepeatMode = () => {
    if (repeatMode == null) return;

    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;

    changeRepeatMode(repeatOrder[nextIndex]);
  };

  const icon: IconName =
    repeatMode === RepeatMode.One
      ? "repeat-once"
      : repeatMode === RepeatMode.All
        ? "repeat"
        : "repeat-off";

  return (
    <MaterialCommunityIcons
      name={icon}
      onPress={toggleRepeatMode}
      color={colors.icon}
      {...iconProps}
    />
  );
};
