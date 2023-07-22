<script setup>
const props = defineProps('error')

</script>

<template>
  <div class="container bg-white">
    <h1 v-if="error.statusCode === 404">Page not found EDITED</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>
