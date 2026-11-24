import TrackPlayer, { PlayerCommand, RepeatMode } from "@rntp/player";
import { useEffect, useRef } from "react";

const setupPlayer = async () => {
  TrackPlayer.setupPlayer({
    contentType: "music",
  });

  TrackPlayer.setCommands({
    capabilities: [
      PlayerCommand.PlayPause,
      PlayerCommand.Stop,
      PlayerCommand.Next,
      PlayerCommand.Previous,
    ],
  });

  TrackPlayer.setVolume(0.3); // not too loud
  TrackPlayer.setRepeatMode(RepeatMode.Off);
};

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false);
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onLoadRef.current = onLoad;
  });

  useEffect(() => {
    if (isInitialized.current) return;

    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoadRef.current?.();
      })
      .catch((error) => {
        isInitialized.current = false;
        console.error(error);
      });
  }, []);
};
