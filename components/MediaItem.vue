<template>
  <div class="media-item">
    <span :class="this.isMediaChannel() ? 'media-item-image-channel' : 'media-item-image-video'">
      <img  v-bind:src="image" />
    </span>
    <span class="media-item-text">
      <p class="title">{{ this.title }}</p>
      <span class="channel-details">
        <p>{{ this.channelName }}</p>
        <span class="media-item-text-dot"></span>
        <p class="media-item-text-published-date">{{ this.publishedAt }}</p>
      </span>
      <p class="media-item-text-description">{{ this.description }}</p>
    </span>
  </div>
</template>
<script>
import { IntervalInSeconds } from "../helper/types/IntervalSeconds";

export default {
  props: ["media"],
  computed: {
    image() {
      return this.media.snippet.thumbnails.medium.url;
    },
    title() {
      return this.media.snippet.title;
    },
    describtion() {
      return this.media.snippet.mediaDescribtion;
    },
    channelName() {
      return this.media.snippet.channelTitle;
    },
    publishedAt() {
      let publishedAt = '';
      const today = this.getTodayDate();
      const publishedDate = this.convertStringToDate(
        this.media.snippet.publishedAt
      );
      const diffInSeconds = this.getDifferenceInSeconds(today, publishedDate);
      const dateInterval = this.getDateInterval(diffInSeconds);
      publishedAt = dateInterval ? this.formatDateInterval(diffInSeconds,dateInterval) : 'just now';
      return publishedAt;
    },
    description() {
      return this.media.snippet.description;
    },
  },
  methods: {
    isMediaChannel() {
      return this.media.id.kind === "youtube#channel";
    },
    convertStringToDate(dateStr) {
      return new Date(dateStr);
    },
    getTodayDate() {
      return new Date();
    },
    getDifferenceInSeconds(today, published) {
      const millisecondsPerSecond = 1000;
      const dateDiff = Math.abs(today.getTime() - published.getTime());
      return Math.ceil(dateDiff / millisecondsPerSecond);
    },
    getDateInterval(diffInSeconds) {
      return IntervalInSeconds.find(
        (interval) => diffInSeconds >= interval.seconds
      );
    },
    formatDateInterval(diffInSeconds, interval){
      const diffDateInInterval = Math.floor(diffInSeconds / interval.seconds);
      const agoText = diffDateInInterval == 1 ? " ago" : "s ago";
      const formattedDate =  diffDateInInterval + " " + interval.type + agoText;
      return formattedDate;
    }
  },
};
</script>