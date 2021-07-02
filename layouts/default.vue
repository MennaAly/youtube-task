<template>
    <div class="main-content">
        <app-header/>
        <div class="page-content">
          <nuxt />
        </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';

export default {
  components: {
    AppHeader
  }
}
</script>
