<template>
  <div class="l-app-header">
    <span class="l-app-header-logo-desktop"
      ><img src="images/youtube_logo_desktop.png"
    /></span>
    <span class="l-app-header-logo-mobile">
      <img
        class="l-app-header-logo-mobile-resize"
        src="images/youtube_logo_mobile.png"
      />
    </span>
    <form class="search-bar" v-on:submit.prevent autocomplete="off">
      <span class="search-bar-text"
        ><input
          v-on:keyup.enter="search()"
          v-model="searchText"
          type="text"
          name="search"
      /></span>
      <span class="search-bar-icon-desktop" @click="search()"
        ><v-icon> mdi-magnify </v-icon></span
      >
      <span class="search-bar-icon-mobile"><v-icon> mdi-magnify </v-icon></span>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    isCurrentPageSearch() {
      return this.$router.history.current.name === "search";
    },
    saveSearchTextInStore() {
      this.$store.dispatch("setSearchText", this.searchText);
    },
    navigateToSearchScreen() {
      this.$router.replace({
        path: "/search",
        query: { searchText: this.searchText },
      });
    },
    search() {
      if (!this.isCurrentPageSearch()) {
        this.navigateToSearchScreen();
      }
      this.saveSearchTextInStore();
    },
  },
};
</script>
