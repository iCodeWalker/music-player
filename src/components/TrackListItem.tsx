import { unknownTrackImageSource } from "@/constants/image";
import { colors, fontSize } from "@/constants/token";
import { defaultStyles } from "@/styles";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { MediaItem, useActiveMediaItem, useIsPlaying } from "@rntp/player";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from "react-native-fast-image";
import { LoaderKitView } from "react-native-loader-kit";
import { TrackShortcutsMenu } from "./TrackShortcutsMenu";

export type TrackListItemProps = {
  track: MediaItem;
  onTrackSelect: (track: MediaItem) => void;
};

const TrackListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TrackListItemProps) => {
  const isActiveTrack = useActiveMediaItem()?.url === track?.url;
  const playing = useIsPlaying();
  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor="rgba(255, 255, 255, 0.08)"
      onPress={() => handleTrackSelect(track)}
    >
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={
              track.artworkUrl
                ? { uri: track.artworkUrl, priority: "high" }
                : unknownTrackImageSource
            }
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
          {isActiveTrack &&
            (playing ? (
              <LoaderKitView
                name="LineScaleParty"
                color={colors.primary}
                style={styles.trackPlayingIconIndicator}
              />
            ) : (
              <Ionicons
                name="play"
                size={24}
                color={colors.icon}
                style={styles.trackPausedIndicator}
              />
            ))}
        </View>
        {/* Track title and artist section */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.text,
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {track.artist}
              </Text>
            )}
          </View>
          <TrackShortcutsMenu track={track}>
              <Entypo
                name="dots-three-horizontal"
                size={18}
                color={colors.icon}
              />
            </TrackShortcutsMenu>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  trackPlayingIconIndicator: {
    position: "absolute",
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: "absolute",
    top: 14,
    left: 14,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
    maxWidth: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});

export default TrackListItem;
