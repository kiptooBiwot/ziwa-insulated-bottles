<script setup>
import bottle from '~/assets/images/products/bottle1-bg.png'
import about_img from '~/assets/images/MOK_4820.jpg'
import about_img1 from '~/assets/images/MOK_4835.jpg'

useHead({
  title: 'Ziwa | About Us'
})

</script>

<template>
  <section id="about" class="min-h-screen">
    <div class="max-w-6xl mx-auto py-40 px-5 xl:px-0">
      <h3 class="text-[#39519f] font-medium text-lg">About Us</h3>
      <h2 class="text-gray-900 font-medium text-[36px] md:text-[36px] tracking-tight">
        Do good. For you. For the environment.
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mt-5">
        <div
          class="md:col-span-7 space-y-8 text-justify flex leading-relaxed flex-col justify-center order-last md:order-first">
          <p class="text-xl font-medium">
            Imagine a world where every sip you take is not just for sustainance or for to quench your thirst. Picture a
            Monday morning, you make your tea or coffee in a Ziwa Insulated Mug with your favourite quote engraved. You're
            unable to finish your beverage and you take it with you to work. Hours later you need a pick me up and when
            you open your mug your beverage is still hot. Just the way you like it.
          </p>
          <p>
            That's the world that Ziwa is trying to create. From superior thermal retention capabilities, the leak proof
            design and an aesthetically pleasing vessel that is personalised your own way. We offer superior quality
            products for adults and kids in the sleeves of designs for the African Market.
          </p>

          <h3 class="text-gray-900 font-medium text-[36px] md:text-[36px] tracking-tight">Our mission </h3>
          <p>
            Ziwa's mission is to redefine the everyday beverage experience by crafting sustainable, stylish, and
            personalized stainless steel drinkware. We are committed to empowering individuals to express their unique
            identities through our products, fostering a culture of sustainability, innovation, and elevated enjoyment in
            every sip. At Ziwa, we believe in transforming the ordinary into the extraordinary, one vessel at a time. One
            sip at a time.
          </p>
        </div>
        <div class=" md:col-span-5 h-auto">
          <!-- Image -->
          <div class="block order-first md:order-last">
            <img :src="about_img" alt="" class="hidden md:flex w-auto h-[350px] mx-auto object-cover rounded-lg mb-5">
            <img :src="about_img1" alt="" class="flex w-auto h-[350px] mx-auto object-cover rounded-lg">

          </div>
      </div>
    </div>
  </div>
</section></template>


<style scoped></style>