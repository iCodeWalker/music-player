import TrackList from "@/components/TrackList";
import { screenPadding } from "@/constants/token";
import { trackTitleFilter } from "@/helpers/filter";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useFavorites } from "@/store/library";
import { defaultStyles } from "@/styles";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";

const FavoritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search a song",
    },
  });
  const favouriteTracks = useFavorites()?.favorites;

  const filteredFavouriteTracks = useMemo(() => {
    if (!search) return favouriteTracks;

    return favouriteTracks?.filter(trackTitleFilter(search));
  }, [search, favouriteTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TrackList
          queueId={generateTracksListId("favourites", search)}
          scrollEnabled={false}
          tracks={filteredFavouriteTracks}
          hideQueueControls={true}
        />
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
