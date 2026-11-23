import TrackPlayer, { RepeatMode } from "@rntp/player";
import { useCallback, useEffect, useState } from "react";

export const useTrackPlayerRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>();

  const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
    TrackPlayer.setRepeatMode(repeatMode);

    setRepeatMode(repeatMode);
  }, []);

  useEffect(() => {
    const mode = TrackPlayer.getRepeatMode();
    setRepeatMode(mode);
  }, []);

  return { repeatMode, changeRepeatMode };
};
