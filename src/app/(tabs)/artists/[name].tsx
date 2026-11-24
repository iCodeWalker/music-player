import { ArtistTracksList } from "@/components/ArtistTrackList";
import { screenPadding } from "@/constants/token";
import { useArtists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

const ArtistDetailScreen = () => {
  const { name: artistName } = useLocalSearchParams<{ name: string }>();

  const artists = useArtists();

  const artist = artists?.find((artist) => artist.name === artistName);

  if (!artist) {
    return <Redirect href={"/(tabs)/artists"} />;
  }

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  );
};

export default ArtistDetailScreen;
