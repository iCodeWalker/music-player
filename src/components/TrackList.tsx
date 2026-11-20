import { screenPadding } from "@/constants/token";
import { utilsStyles } from "@/styles";
import { MediaItem } from "@rntp/player";
import { FlatList, FlatListProps, View } from "react-native";
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
    console.log(track);
  };
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={[
        {
          paddingTop: 10,
          paddingBottom: 128,
          paddingHorizontal: screenPadding.horizontal,
        },
        contentContainerStyle,
      ]}
      ListFooterComponent={ItemDivider}
      contentInsetAdjustmentBehavior="automatic"
      ItemSeparatorComponent={ItemDivider}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      {...flatlistProps}
    />
  );
};

export default TrackList;
