import { PlaylistsList } from "@/components/PlaylistsList";
import { screenPadding } from "@/constants/token";
import { Playlist } from "@/helpers/types";
import { usePlaylists, useTracks } from "@/store/library";
import { useQueue } from "@/store/queue";
import { defaultStyles } from "@/styles";
import TrackPlayer from "@rntp/player";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddToPlaylistModal = () => {
  const router = useRouter();

  const { activeQueueId } = useQueue();

  const { trackUrl } = useLocalSearchParams<{ trackUrl: string }>();

  const tracks = useTracks();

  const { playlists, addToPlaylist } = usePlaylists();

  const track = tracks.find((currentTrack) => trackUrl === currentTrack.url);

  // track was not found
  if (!track) {
    return null;
  }

  const availablePlaylists = playlists.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
  );

  console.log(availablePlaylists, "availablePlaylists");

  const handlePlaylistPress = async (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);

    // should close the modal
    router.dismiss();

    // if the current queue is the playlist we're adding to, add the track at the end of the queue
    if (activeQueueId?.startsWith(playlist.name)) {
      TrackPlayer.addMediaItem(track);
    }
  };

  return (
    <SafeAreaView style={[styles.modalContainer]}>
      <PlaylistsList
        playlists={availablePlaylists}
        onPlaylistPress={handlePlaylistPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
  },
});

export default AddToPlaylistModal;
