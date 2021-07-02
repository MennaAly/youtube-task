<template>
  <div class="l-media-list">
    <media-item
      v-for="(media, index) in mediaList"
      :media="media"
      :key="`media-${index}`"
      @click.native="viewDetails(media)"
    ></media-item>
  </div>
</template>
<script>
import { PlaylistRoute } from "../helper/types/routes/playlistRoute";
import { ChannelRoute } from "../helper/types/routes/channelRoute";
import { VideoRoute } from "../helper/types/routes/videoRoute";

export default {
  props: ["mediaList"],
  data() {
    return {
      mediaRoute: null,
    };
  },
  methods: {
    getMediaRouteInstance(media) {
      switch (media.id.kind) {
        case "youtube#channel":
          return new ChannelRoute(media.id.channelId);
        case "youtube#playlist":
          return new PlaylistRoute(media.id.playlistId);
        default:
          return new VideoRoute(media.id.videoId);
      }
    },
    saveMediaTypeInStore() {
      this.$store.dispatch("setMediaType", this.mediaRoute.type);
    },
    navigate() {
      this.$router.push({
        path: `/${this.mediaRoute.getNavigetionDestination()}/${this.mediaRoute.mediaId}`,
      });
    },
    viewDetails(media) {
      this.mediaRoute = this.getMediaRouteInstance(media);
      this.saveMediaTypeInStore();
      this.navigate();
    },
  },
};
</script>