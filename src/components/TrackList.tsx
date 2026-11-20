import { screenPadding } from "@/constants/token";
import { utilsStyles } from "@/styles";
import { FlatList, FlatListProps, View } from "react-native";
import library from "../../assets/data/library.json";
import TrackListItem from "./TrackListItem";

export type TrackListProps = Partial<
  FlatListProps<(typeof library)[number]>
> & {
  tracks: any[];
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
        <TrackListItem
          track={{
            ...track,
            image: track.artwork,
          }}
        />
      )}
      {...flatlistProps}
    />
  );
};

export default TrackList;
