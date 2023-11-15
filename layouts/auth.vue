<script setup>
import ToastList from '@/components/ToastList';


</script>

<template>
  <main>
    <slot />
    <ClientOnly>
      <ToastList />
    </ClientOnly>
  </main>
</template>


<style lang="scss" scoped></style>