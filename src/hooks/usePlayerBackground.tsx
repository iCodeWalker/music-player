import { colors } from "@/constants/token";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors, IOSImageColors } from "react-native-image-colors/build/types";

type ImageColors = IOSImageColors | AndroidImageColors | null;

const getGradientColors = (imageColors: ImageColors): [string, string] => {
  if (!imageColors) return [colors.background, colors.background];
  if (Platform.OS === "android") {
    const c = imageColors as AndroidImageColors;
    return [c.dominant ?? colors.background, c.vibrant ?? colors.background];
  }
  const c = imageColors as IOSImageColors;
  return [c.background ?? colors.background, c.primary ?? colors.background];
};

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<ImageColors>(null);

  useEffect(() => {
    if (!imageUrl) return;
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((result) => setImageColors(result as ImageColors));
  }, [imageUrl]);

  return { imageColors, gradientColors: getGradientColors(imageColors) };
};
