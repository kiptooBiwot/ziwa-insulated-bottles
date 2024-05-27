<script setup>
definePageMeta({
  layout: 'dashboard',
  // middleware: 'auth'
})
</script>

<template>
  <div class="min-h-screen">
    <h2 class="font-bold text-xl py-3">Dashboard</h2>

    <div class="flex flex-row flex-wrap">
      <div class="mb-10 w-full max-w-full flex-shrink px-8 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Total Orders
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-green-500 ltr:float-right rtl:float-left"
            >
              +12%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-rose-500 text-center text-pink-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-cart3 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">421</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-8 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Total Sales
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-green-500 ltr:float-right rtl:float-left"
            >
              +15%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-yellow-500 text-center text-yellow-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-credit-card absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"
                ></path>
                <path
                  d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold"><span>$</span>31K</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-8 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            New Customers
            <div
              x-on:mouseover="tooltips = true"
              x-on:mouseleave="tooltips = false"
              class="text-pink-500 ltr:float-right rtl:float-left"
            >
              -5%
              <div
                class="absolute bottom-full top-auto mb-3"
                x-show.transition.origin.top="tooltips"
                style="display: none"
              >
                <div
                  class="z-40 -mb-1 w-32 rounded-lg bg-black p-2 text-center text-sm leading-tight text-white shadow-lg"
                >
                  Since last month
                </div>
                <div
                  class="absolute bottom-0 -mb-2 w-1 -rotate-45 transform bg-black p-1 ltr:ml-6 rtl:mr-6"
                ></div>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-green-500 text-center text-green-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-person absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">1.2K</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
      <div class="mb-10 w-full max-w-full flex-shrink px-8 sm:w-1/2 lg:w-1/4">
        <div class="h-full rounded-xl bg-white shadow-2xl">
          <div
            x-data="{ tooltips: false }"
            class="relative px-6 pt-6 text-sm font-semibold"
          >
            Users Online
            <span
              class="mt-1 h-2 w-2 animate-pulse rounded-full bg-green-500 ltr:float-right rtl:float-left"
            ></span>
          </div>
          <div class="flex flex-row justify-between px-6 py-4">
            <div
              class="relative h-14 w-14 self-center rounded-full bg-indigo-500 text-center text-indigo-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-people absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                ></path>
              </svg>
            </div>
            <h2 class="self-center text-3xl font-bold">602</h2>
          </div>
          <div class="px-6 pb-6">
            <a class="text-sm hover:text-indigo-500" href="#">View more...</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
