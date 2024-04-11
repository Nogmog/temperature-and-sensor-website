<script setup>
import { RouterView } from 'vue-router'
import Navigation from './views/components/Navigation.vue'

</script>

<template>
  <Navigation v-if="!$route.meta.hideNavigation" />
  <RouterView />
</template>

<!-- <style>
.btn {
  @apply font-bold bg-lightblue text-black p-1 border-2 rounded;

}

.btn:hover {
  @apply bg-blue underline;
}

.loading {
  @apply italic;
}

.error {
  @apply bg-error text-black;
}
</style> -->