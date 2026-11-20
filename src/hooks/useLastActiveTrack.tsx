import { MediaItem, useActiveMediaItem } from "@rntp/player";
import { useEffect, useState } from "react";

export const useLastActiveTrack = () => {
  const activeTrack = useActiveMediaItem();
  const [lastActiveTrack, setLastActiveTrack] = useState<MediaItem>();

  useEffect(() => {
    if (!activeTrack) return;

    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
};
