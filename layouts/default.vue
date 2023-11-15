<script setup>
// import ToastList from '@/components/ToastList'


</script>

<template>
  <div class="overflow-x-hidden">
    <header>
      <NavBar />
    </header>
    <main>
      <!-- <ClientOnly>
        <ToastList />
      </ClientOnly> -->
      <slot />
      <ClientOnly>
        <ToastList />
      </ClientOnly>
    </main>
    <footer id="Contact">
      <Footer />
    </footer>
  </div>
</template>


<style scoped></style>