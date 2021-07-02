<template>
  <div class="l-details">
    <span class="details-video">
      <iframe :src="`https://youtube.com/embed/${this.mediaId}`" />
    </span>
    <span class="details-text">
      <p>{{ this.title }}</p>
      <span>
        <span class="details-text-views">
          <p>{{ this.channelTitle }}</p>
          <p>{{ this.views | formatViewCount}} Views</p>
        </span>
        <span class="details-text-statistics">
          <span class="likes-and-dislikes">
            <v-icon>mdi-thumb-up</v-icon>
            <p>{{ this.likes | formatLikes}}</p>
            <v-icon>mdi-thumb-down</v-icon>
            <p>{{ this.dislikes | formatLikes }}</p>
          </span>
          <span class="group-of-icons">
            <span class="plus-icon">
              <v-icon>mdi-plus</v-icon>
            </span>
            <span class="share-icon">
              <v-icon>mdi-share</v-icon>
              <p>share</p>
            </span>
            <span class="flag-icon">
              <v-icon>mdi-flag-variant</v-icon>
            </span>
            <span class="line-list">
              <v-icon>mdi-format-list-bulleted</v-icon>
            </span>
            <span class="more-icon">
              <v-icon>mdi-dots-horizontal</v-icon>
            </span>
          </span>
        </span>
      </span>
    </span>
    <span class="details-channel">
      <hr class="horizontal-line" />
      <p>{{ this.channelTitle }}</p>
      <p>Published on {{ this.publishedDate | formatPublishedDate }}</p>
    </span>
    <media-list-component :mediaList="mediaList" />
  </div>
</template>

<script>
import { MediaTypes } from "../../helper/types/MediaMapper";
import { APIFactory } from "../../services/http/APIFactory";
import { NumberSymbol } from "../../helper/types/NumberSymbol";
import MediaListComponent from "../../components/MediaList.vue";

const apiFactory = new APIFactory();

export default {
  async asyncData({ params }) {
    const mediaId = params.slug;
    return { mediaId };
  },
  async created() {
    if (this.getMediaTypeFromStore() == MediaTypes.video) {
      await this.getVideoDetails();
      await this.getRelatedVideos();
    } else {
      await this.getPlaylistItems();
    }
  },
  components: { MediaListComponent },
  data() {
    return {
      mediaList: [],
      displayedVideo: null,
      videoApiFactory: apiFactory.get(MediaTypes.video),
      playlistApiFactory: apiFactory.get(MediaTypes.playlist),
    };
  },
  computed: {
    title() {
      let title = "";
      if (this.isDisplayedVideoValid())
        title = this.displayedVideo.snippet.title;
      return title;
    },
    channelTitle() {
      let channelTitle = "";
      if (this.isDisplayedVideoValid())
        channelTitle = this.displayedVideo.snippet.channelTitle;
      return channelTitle;
    },
    views() {
      let views = "";
      if (this.isDisplayedVideoValid())
        views = this.displayedVideo.statistics.viewCount;
      return views;
    },
    likes() {
      let likes = "";
      if (this.isDisplayedVideoValid())
        likes = this.displayedVideo.statistics.likeCount;
      return likes;
    },
    dislikes() {
      let dislikes = "";
      if (this.isDisplayedVideoValid())
        dislikes = this.displayedVideo.statistics.dislikeCount;
      return dislikes;
    },
    publishedDate() {
      let publishedDate = "";
      if (this.isDisplayedVideoValid())
        publishedDate = this.displayedVideo.snippet.publishedAt;
      return publishedDate;
    },
  },
  filters: {
    formatViewCount(views) {
      const viewsInNumericFormat = Number(views);
      return viewsInNumericFormat.toLocaleString();
    },
    formatLikes(likes) {
      const likesInNumericFormat = Number(likes);
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = NumberSymbol.slice()
        .reverse()
        .find(function (item) {
          return likesInNumericFormat >= item.value;
        });
      return item
        ? (likesInNumericFormat / item.value).toFixed(1).replace(rx, "$1") +
            item.symbol
        : "0";
    },
    formatPublishedDate(publishedDate) {
      const publishedDateInDateFormat = new Date(publishedDate);
      const day = publishedDateInDateFormat.toLocaleString("default", {
        day: "numeric",
      });
      const month = publishedDateInDateFormat.toLocaleString("default", {
        month: "short",
      });
      const year = publishedDateInDateFormat.toLocaleString("default", {
        year: "numeric",
      });
      return day + " " + month + " " + year;
    },
  },
  methods: {
    isDisplayedVideoValid() {
      return this.displayedVideo != null;
    },
    getMediaTypeFromStore() {
      return this.$store.getters.getMediaType;
    },
    getSearchTextFromStore() {
      return this.$store.getters.getSearchText;
    },
    async getVideoDetails() {
      await this.videoApiFactory.getVideoDetails(
        { part: "snippet,contentDetails,statistics", id: this.mediaId },
        this.setDisplayedVideo
      );
    },
    async getRelatedVideos() {
      const searchText = this.getSearchTextFromStore();
      const options = {
        q: searchText,
        type: MediaTypes.video,
      };
      await this.videoApiFactory.getRelatedVideos(options, this.setMediaList);
    },
    handlePlaylistResponse(playlistItems) {
      if (this.isListValid(playlistItems)) {
        this.setDisplayedVideo(playlistItems[0]);
        this.setMediaList(playlistItems);
      }
    },
    async getPlaylistItems() {
      await this.playlistApiFactory.getPlaylistItems(
        { playlistId: this.mediaId, maxResults: 5 },
        this.handlePlaylistResponse
      );
    },
    removeDisplayedVideoFromMediaList() {
      const videoId = this.displayedVideo.id;
      this.mediaList = this.mediaList.filter(
        (media) => media.id.videoId != videoId
      );
    },
    setDisplayedVideo(videoList) {
      this.displayedVideo = videoList.items[0];
    },
    setMediaList(mediaList) {
      this.mediaList = mediaList.items;
      this.removeDisplayedVideoFromMediaList(mediaList.items);
    },
    isListValid(list) {
      return list.length;
    }
  },
};
</script>
