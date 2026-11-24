import { useFavorites } from "@/store/library";
import TrackPlayer, { useActiveMediaItem } from "@rntp/player";
import { useCallback } from "react";

export const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveMediaItem(); // From track player

  const { favorites, toggleTrackFavorite } = useFavorites();

  const isFavorite =
    favorites.find((track) => track.url === activeTrack?.url)?.rating === 1;

  // we're updating both the track player internal state and application internal state
  const toggleFavorite = useCallback(async () => {
    const id = TrackPlayer.getActiveMediaItemIndex();

    if (id == null) return;

    // update track player internal state (rating is a custom field, cast needed)
    TrackPlayer.updateMetadata(id, {
      rating: isFavorite ? 0 : 1,
    } as any);

    // update the app internal state
    if (activeTrack) {
      toggleTrackFavorite(activeTrack);
    }
  }, [isFavorite, toggleTrackFavorite, activeTrack]);

  return { isFavorite, toggleFavorite };
};
