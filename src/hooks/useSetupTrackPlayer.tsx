import TrackPlayer, { PlayerCommand, RepeatMode } from "@rntp/player";
import { useEffect, useRef } from "react";

const setupPlayer = async () => {
  TrackPlayer.setupPlayer({
    contentType: "music",
  });

  TrackPlayer.setCommands({
    capabilities: [
      PlayerCommand.PlayPause,
      PlayerCommand.Next,
      PlayerCommand.Previous,
    ],
  });

  TrackPlayer.setVolume(0.3); // not too loud
  TrackPlayer.setRepeatMode(RepeatMode.Off);
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .catch((error) => {
        isInitialized.current = false;
        console.error(error);
      });
  }, [onLoad]);
};
