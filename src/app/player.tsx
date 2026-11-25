import { MovingText } from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerProgressBar } from "@/components/PlayerProgressBar";
import { PlayerRepeatToggle } from "@/components/PlayerRepeatToggle";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { unknownTrackImageSource } from "@/constants/image";
import { colors, fontSize, screenPadding } from "@/constants/token";
import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import { useTrackPlayerFavorite } from "@/hooks/useTrackPlayerFavorite";
import { defaultStyles, utilsStyles } from "@/styles";
import { FontAwesome } from "@expo/vector-icons";
import { useActiveMediaItem } from "@rntp/player";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlayerScreen = () => {
  const track = useActiveMediaItem();
  const { gradientColors } = usePlayerBackground(
    typeof track?.artworkUrl === "string" ? track.artworkUrl : "",
  );

  const { top, bottom } = useSafeAreaInsets();

  const { isFavorite, toggleFavorite } = useTrackPlayerFavorite();

  if (!track) {
    return (
      <View style={[styles.overlayContainer, { justifyContent: "center" }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    );
  }

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradientColors}>
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />

        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <FastImage
              source={
                track.artworkUrl
                  ? { uri: track.artworkUrl, priority: "high" }
                  : unknownTrackImageSource
              }
              style={styles.artworkImage}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: "auto" }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Track title */}
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={track.title ?? ""}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>

                  {/* Favorite button icon */}
                  <FontAwesome
                    name={isFavorite ? "heart" : "heart-o"}
                    size={20}
                    color={isFavorite ? colors.primary : colors.icon}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavorite}
                  />
                </View>
                {/* Track artist */}
                {track.artist && (
                  <Text
                    numberOfLines={1}
                    style={[styles.trackArtistText, { marginTop: 6 }]}
                  >
                    {track.artist}
                  </Text>
                )}
              </View>
              <PlayerProgressBar style={{ marginTop: 32 }} />

              <PlayerControls style={{ marginTop: 40 }} />
            </View>
            <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
            <View style={utilsStyles.centeredRow}>
              <PlayerRepeatToggle size={30} style={{ marginBottom: 20 }} />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.navigate("/(tabs)/(songs)")}>
      <View
        style={{
          position: "absolute",
          top: top + 15,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: " red",
        }}
      >
        <View
          accessible={false}
          style={{
            width: 50,
            height: 10,
            borderRadius: 8,
            backgroundColor: "#fff",
            opacity: 0.7,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "transparent",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});

export default PlayerScreen;
