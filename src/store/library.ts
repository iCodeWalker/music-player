import { Artist, TrackWithPlaylist } from "@/helpers/types";
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

export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const data = tracks.reduce((acc, track) => {
    const existingArtist = acc?.find((artist) => artist.name === track.artist);

    if (existingArtist) {
      existingArtist.tracks.push(track);
    } else {
      acc.push({
        name: track.artist ?? "Unknown",
        tracks: [track],
      });
    }

    return acc;
  }, [] as Artist[]);

  return data;
};
