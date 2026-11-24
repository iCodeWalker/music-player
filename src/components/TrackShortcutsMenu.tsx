import { useFavorites } from "@/store/library";
import { useQueue } from "@/store/queue";
import { MenuView, type MenuComponentRef } from "@react-native-menu/menu";
import TrackPlayer, { MediaItem } from "@rntp/player";
import { useRouter } from "expo-router";
import { PropsWithChildren, useRef } from "react";
import { Platform, Pressable } from "react-native";

type TrackShortcutsMenuProps = PropsWithChildren<{ track: MediaItem }>;

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const router = useRouter();
  const menuRef = useRef<MenuComponentRef>(null);

  const isFavorite = (track as MediaItem & { rating?: number }).rating === 1;

  const { toggleTrackFavorite } = useFavorites();
  const { activeQueueId } = useQueue();

  const handlePressAction = async (id: string) => {
    switch (id) {
      case "add-to-favorites": {
        toggleTrackFavorite(track);

        // if the tracks is in the favorite queue, add it
        if (activeQueueId?.startsWith("favorites")) {
          TrackPlayer.addMediaItem(track);
        }
        break;
      }
      case "remove-from-favorites": {
        toggleTrackFavorite(track);

        // if the track is in the favorites queue, we need to remove it
        if (activeQueueId?.startsWith("favorites")) {
          const queue = TrackPlayer.getQueue();

          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url,
          );

          TrackPlayer.removeMediaItem(trackToRemove);
        }
        break;
      }
      case "add-to-playlist": {
        // it opens the addToPlaylist modal
        router.push({
          pathname: "(modals)/addToPlaylist",
          params: {
            trackUrl: typeof track.url === "object" ? track.url.uri : track.url,
          },
        });
        break;
      }
      default:
        console.warn(`Unknown menu action ${id}`);
    }
  };

  return (
    <MenuView
      ref={menuRef}
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isFavorite ? "Remove from favorites" : "Add to favorites",
          image: Platform.select({
            ios: isFavorite ? "star.fill" : "star",
            android: isFavorite ? "btn_star_big_on" : "btn_star_big_off",
          }),
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: Platform.select({
            ios: "plus",
            android: "ic_menu_add",
          }),
        },
      ]}
    >
      {/* Pressable intercepts the touch so the parent TouchableHighlight
          doesn't fire, then imperatively shows the menu via ref */}
      <Pressable onPress={() => menuRef.current?.show()}>{children}</Pressable>
    </MenuView>
  );
};
