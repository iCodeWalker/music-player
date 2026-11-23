import { MediaItem } from "@rntp/player";

export type Playlist = {
  name: string;
  tracks: MediaItem[];
  artworkPreview: string;
};

export type Artist = {
  name: string;
  tracks: MediaItem[];
};

export type TrackWithPlaylist = MediaItem & {
  playlist?: string[];
  rating?: number;
};
