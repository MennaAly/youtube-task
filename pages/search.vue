<template>
  <div ref="search" class="l-search-page">
    <filter-header :mediaCount="searchResultCount" />
    <hr class="horizontal-line" />
    <media-list-component :mediaList="mediaList" />
    <span class="load-more-desktop">
      <scroll-loader
        :loader-method="getAllMedia"
        :loader-disable="isMediaListEmpty"
      >
      </scroll-loader>
    </span>
    <span class="load-more-mobile">
      <hr v-if="!isMediaListEmpty" class="horizontal-line" />
      <span class="load-more-mobile-button-loader">
        <button v-if="!loadMoreMedia" @click="getAllMedia(handleResponseInUpdateMode)">
        Show more items
      </button>
      <div v-else class="loader"></div>
      </span>
    </span>
  </div>
</template>
<script>
import Vue from "vue";
import AppHeader from "../components/AppHeader.vue";
import FilterHeader from "../components/FilterHeader.vue";
import { MediaTypes } from "../helper/types/MediaMapper";
import { APIFactory } from "../services/http/APIFactory";
import MediaListComponent from "../components/MediaList.vue";
import ScrollLoader from "vue-scroll-loader";

const apiFactory = new APIFactory();
const mediaRepository = apiFactory.get(MediaTypes.all);


Vue.use(ScrollLoader);

export default {
  components: { AppHeader, FilterHeader, MediaListComponent },
  layout: "default",
  created() {
    this.setSearchText(this.$route.query.searchText);
  },
  data() {
    return {
      options: {},
      mediaList: [],
      pageToken: "",
      searchText: "",
      loadMoreMedia: false,
      searchResultCount: 0,
    };
  },
  computed: {
    searchTextGetter() {
      return this.$store.getters.getSearchText;
    },
    isMediaListEmpty() {
      return this.mediaList.length == 0;
    },
  },
  watch: {
    searchTextGetter(newText, oldText) {
      if (newText !== oldText) {
        this.setSearchText(newText);
      } else {
        this.getAllMedia(this.handleResponseInUpdateMode);
      }
    },
    searchText() {
      this.getAllMedia(this.handleResponseInNewMode);
    },
  },
  methods: {
    setSearchText(text) {
      this.searchText = text;
    },
    setOptions() {
      this.options = {
        q: this.searchText,
        type: MediaTypes.all,
      };
      if (this.pageToken) this.addPageTokenToOptions();
    },
    addPageTokenToOptions() {
      this.options.pageToken = this.pageToken;
    },
    setNumberOfResults(resultCount) {
      this.searchResultCount = resultCount;
    },
    addToMediaList(resultItems) {
      this.mediaList.push(...resultItems);
      console.log(' the media list ',this.mediaList);
    },
    setNextPageToken(pageToken) {
      this.pageToken = pageToken;
    },
    setMediaList(mediaList) {
      this.mediaList = mediaList;
    },
    handleResponseInUpdateMode(data) {
      this.setNumberOfResults(data.pageInfo.totalResults);
      this.addToMediaList(data.items);
      this.setNextPageToken(data.nextPageToken);
    },
    handleResponseInNewMode(data) {
      this.setNumberOfResults(data.pageInfo.totalResults);
      this.setMediaList(data.items);
      this.setNextPageToken(data.nextPageToken);
    },
    activateLoadMoreMedia() {
      this.loadMoreMedia = true;
    },
    deactivateLoadMoreMedia() {
      this.loadMoreMedia = false;
    },
    async getAllMedia(handleResponseMethod) {
      handleResponseMethod =
        handleResponseMethod || this.handleResponseInUpdateMode;
      this.activateLoadMoreMedia();
      this.setOptions();
      await mediaRepository.getAllMedia(
        this.options,
        handleResponseMethod
      );
      this.deactivateLoadMoreMedia();
    },
  },
};
</script>
