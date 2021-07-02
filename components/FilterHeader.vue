<template>
  <div class="l-filter-header">
    <div class="l-filter-header-desktop">
      <p :class="mediaCount ? 'display-content' : 'hide-content'">
        About {{ mediaCount }} results
      </p>
      <span>
        <v-icon>mdi-filter-variant</v-icon>
        <p>FILTER</p>
      </span>
    </div>
    <div class="l-filter-header-mobile">
      <filter-drop-down
        v-for="(filter, index) in filters"
        :key="`filter-${index}`"
        :filters="filter"
      />
    </div>
  </div>
</template>
<script>
import FilterDropDown from "./FilterDropDown.vue";

export default {
  components: { FilterDropDown },
  props: ["mediaCount"],
  data() {
    return {
      filters: [
        ["All", "Channel", "Play list"],
        ["Today", "Week", "Year"],
      ],
    };
  },
};
</script>