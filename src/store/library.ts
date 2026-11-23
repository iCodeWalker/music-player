import { TrackWithPlaylist } from "@/helpers/types";
import { MediaItem } from "@rntp/player";
import { useMemo } from "react";
import { create } from "zustand";
import library from "../../assets/data/library.json";

interface libraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavorite: (track: MediaItem) => void;
  addToPlaylist: (track: MediaItem, playListName: string) => void;
}

export const useLibraryStore = create<libraryState>((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite,
  );

  const favorties = useMemo(
    () => tracks?.filter((track) => track.rating === 1),
    [tracks],
  );

  return {
    favorties,
    toggleTrackFavorite,
  };
};
