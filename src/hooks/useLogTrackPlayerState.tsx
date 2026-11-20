import TrackPlayer, { Event } from "@rntp/player";
import { useEffect } from "react";

export const useLogTrackPlayerState = () => {
  useEffect(() => {
    const errorSubscription = TrackPlayer.addEventListener(
      Event.PlaybackError,
      (event) => {
        console.warn("An error occurred:", event);
      },
    );

    const stateSubscription = TrackPlayer.addEventListener(
      Event.PlaybackStateChanged,
      ({ state }) => {
        console.log("Playback state:", state);
      },
    );

    const trackSubscription = TrackPlayer.addEventListener(
      Event.MediaItemTransition,
      ({ index }) => {
        console.log("Track changed:", index);
      },
    );

    return () => {
      errorSubscription.remove();
      stateSubscription.remove();
      trackSubscription.remove();
    };
  }, []);
};
