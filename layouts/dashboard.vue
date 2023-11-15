<script setup>

</script>
<template>
  <div class="flex h-screen bg-slate-100">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50">
        <div class="container mx-auto px-6 py-8">
          <slot />
          <ClientOnly>
            <ToastList />
          </ClientOnly>
        </div>
      </main>
      <DashboardFooter />
    </div>
  </div>
</template>
