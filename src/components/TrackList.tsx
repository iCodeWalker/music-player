import { unknownTrackImageSource } from "@/constants/image";
import { screenPadding } from "@/constants/token";
import { utilsStyles } from "@/styles";
import TrackPlayer, { MediaItem } from "@rntp/player";
import { FlatList, FlatListProps, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackListItem from "./TrackListItem";

export type TrackListProps = Partial<FlatListProps<MediaItem>> & {
  tracks: MediaItem[];
};

const ItemDivider = () => (
  <View
    style={{
      ...utilsStyles.itemSeparator,
      marginVertical: 9,
      marginLeft: 60,
    }}
  />
);

const TrackList = ({
  tracks,
  contentContainerStyle,
  ...flatlistProps
}: TrackListProps) => {
  const handleTrackSelect = (track: MediaItem) => {
    TrackPlayer.setMediaItem(track);
    TrackPlayer.play();
  };
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={[
        {
          paddingTop: 10,
          paddingBottom: 200,
          paddingHorizontal: screenPadding.horizontal,
        },
        contentContainerStyle,
      ]}
      ListFooterComponent={ItemDivider}
      contentInsetAdjustmentBehavior="automatic"
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>

          <FastImage
            source={unknownTrackImageSource}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      {...flatlistProps}
    />
  );
};

export default TrackList;
