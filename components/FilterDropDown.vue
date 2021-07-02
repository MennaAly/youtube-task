<template>
  <div data-app class="filter-drop-down">
    <v-select
      :items="filters"
      :label="`${selectedFilter}`"
      :menu-props="{ top: true, offsetY: true }"
      background-color="#f8f8f8"
      :height="10"
      :width="10"
      small-chips
      dense
      solo
    >
    </v-select>
  </div>
</template>

<script>
export default {
  props: ["filters"],
  data() {
    return {
      closeOnContentClick: true,
      selectedFilter: this.filters[0],
    };
  },
};
</script>