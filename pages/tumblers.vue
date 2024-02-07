<script setup>

const nuxtApp = useNuxtApp()

nuxtApp.$fb.enable()
</script>

<template>
  <div class="w-full py-24">
    <div class="max-w-2xl mx-auto px-10 space-y-5 py-10">
      <h1 class="text-3xl font-bold text-center">Tumblers</h1>
      <p class="text-center text-xl">Currently we have no tumblers in stock. We are stocking up very soon. </p>
      <img
        src="https://images.pexels.com/photos/4271927/pexels-photo-4271927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="" class="object-contain w-full h-auto">
    </div>
  </div>
</template>
