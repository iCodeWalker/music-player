import { unknownTrackImageSource } from "@/constants/image";
import { screenPadding } from "@/constants/token";
import { useQueue } from "@/store/queue";
import { utilsStyles } from "@/styles";
import TrackPlayer, { MediaItem } from "@rntp/player";
import { useRef } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { QueueControls } from "./QueueControls";
import TrackListItem from "./TrackListItem";

export type TrackListProps = Partial<FlatListProps<MediaItem>> & {
  queueId: string;
  tracks: MediaItem[];
  hideQueueControls?: boolean;
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
  queueId,
  tracks,
  hideQueueControls = false,
  contentContainerStyle,
  ...flatlistProps
}: TrackListProps) => {
  const queueOffSet = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = (selectedTrack: MediaItem) => {
    // 1st : we need to ge the track index
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url,
    );

    if (trackIndex === -1) return;

    const isTrackQueueChanging = queueId !== activeQueueId;

    if (isTrackQueueChanging) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      TrackPlayer.clear();

      // created a new queue
      TrackPlayer.addMediaItem(selectedTrack);
      TrackPlayer.addMediaItems(afterTracks);
      TrackPlayer.addMediaItems(beforeTracks);

      // play a current song
      TrackPlayer.play();
      queueOffSet.current = trackIndex;
      setActiveQueueId(queueId);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffSet.current < 0
          ? tracks?.length + trackIndex - queueOffSet.current
          : trackIndex - queueOffSet.current;

      TrackPlayer.skipToIndex(nextTrackIndex);
      TrackPlayer.play();
    }

    // TrackPlayer.setMediaItem(track);
    // TrackPlayer.play();
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
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
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
