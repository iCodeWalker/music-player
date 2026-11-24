import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
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
  toggleTrackFavorite: (track) =>
    set((state) => ({
      tracks: state.tracks?.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            rating: currentTrack?.rating === 1 ? 0 : 1,
          };
        } else {
          return currentTrack;
        }
      }),
    })),
  addToPlaylist: (track, playlistName) =>
    set((state) => ({
      tracks: state.tracks?.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            playlist: [...(currentTrack.playlist ?? []), playlistName],
          };
        }

        return currentTrack;
      }),
    })),
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorites = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite,
  );

  const favorites = useMemo(
    () => tracks?.filter((track) => track.rating === 1),
    [tracks],
  );

  return {
    favorites,
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

export const usePlaylists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const playlists = tracks.reduce((acc, track) => {
    track?.playlist?.forEach((playlistName) => {
      const existingPlaylist = acc.find(
        (playlist) => playlist.name === playlistName,
      );

      if (existingPlaylist) {
        existingPlaylist.tracks.push(track);
      } else {
        acc.push({
          name: playlistName ?? "Unknown",
          tracks: [track],
          artworkPreview:
            typeof track.artworkUrl === "string" ? track.artworkUrl : "",
        });
      }
    });

    return acc;
  }, [] as Playlist[]);

  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);

  return { playlists, addToPlaylist };
};
