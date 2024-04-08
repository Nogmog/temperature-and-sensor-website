<script setup>
import { RouterView } from 'vue-router'
import Navigation from './views/components/Navigation.vue'

</script>

<template>
  <Navigation v-if="!$route.meta.hideNavigation" />
  <RouterView />
</template>
