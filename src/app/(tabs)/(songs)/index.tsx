import TrackList from "@/components/TrackList";
import { screenPadding } from "@/constants/token";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useTracks } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search a song",
    },
  });

  const tracks = useTracks();

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TrackList
          queueId={generateTracksListId("songs", search)}
          scrollEnabled={false}
          tracks={filteredSongs}
        />
      </ScrollView>
    </View>
  );
};

export default SongsScreen;
