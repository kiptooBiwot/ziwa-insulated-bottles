<script setup>
import bottle from '~/assets/images/products/bottle1-bg.png'
import about_img from '/images/about-new1.jpeg'
import about_img1 from '/images/about-new2.jpeg'
import hero_img from '/images/about-new-hero.png'

useHead({
  title: 'Ziwa | About Us',
})

const nuxtApp = useNuxtApp()

nuxtApp.$fb.enable()
</script>

<template>
  <section id="about" class="min-h-screen">
    <div class="hidden lg:flex w-full h-[300px] bg-[#0575C5] pb-20">
      <div class="max-w-4xl lg:mx-auto mx-5 h-[300px] flex items-center">
        <div class="w-1/2 mx-auto flex items-end">
          <div class="w-full mx-auto space-y-10">
            <h1 class="text-white font-bold font-display text-5xl text-center">
              Karibu Ziwa
            </h1>
            <h3 class="text-white text-center">
              We know you’re curious about us so allow us to introduce
              ourselves.
            </h3>
          </div>
        </div>
        <div class="w-1/2 flex justify-center">
          <img :src="hero_img" class="w-auto h-[300px]" />
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto py-10 px-5 xl:px-0">
      <h3 class="text-[#39519f] font-semibold text-2xl">About Us</h3>
      <!-- <h2
        class="text-gray-900 font-medium text-[36px] md:text-[36px] tracking-tight"
      >
        Do good. For you. For the environment.
      </h2> -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 mt-5">
        <div
          class="md:col-span-7 space-y-8 text-justify flex leading-relaxed flex-col justify-start order-last md:order-first"
        >
          <!-- <p class="text-semibold">Karibu Ziwa</p>
          <p>
            We know you’re curious about us so allow us to introduce ourselves.
          </p> -->
          <p>
            Hi, we are Ziwa. We believe that every sip should be a delightful
            experience! We&#39;re a Kenyan- based drinkware brand dedicated to
            transforming your everyday hydration into a fun, stylish and
            functional adventure.
          </p>
          <p>
            The goal is for every Ziwa product to be a valuable addition to the
            rollercoaster that life is. Our MO is functional vessels designed to
            keep your drinks just the way you like them—hot or cold—all day
            long. Whether you're hiking up a mountain, heading to the gym, or
            simply chilling at home, our sleek and sturdy vessels are the
            perfect companions for every occasion.
          </p>

          <p>
            But we don't stop at functionality! We know that your drinkware
            should be as unique as you are. That's why we offer personalized
            options of a variety of colors, with an option to add your name,
            initials or favorite quote. It's not just a bottle; it's your
            bottle.
          </p>
          <p>
            We understand that great things happen outside, so that is why every
            Ziwa vessel is designed to ensure that wherever life takes you, you
            get to take us with you.We’re excited you made it this far and
            welcome to the coolest side of hydration!
          </p>
          <!-- <p class="text-xl font-medium">
            Imagine a world where every sip you take is not just for sustainance or for to quench your thirst. Picture a
            Monday morning, you make your tea or coffee in a Ziwa Insulated Mug with your favourite quote engraved. You're
            unable to finish your beverage and you take it with you to work. Hours later you need a pick me up and when
            you open your mug your beverage is still hot. Just the way you like it.
          </p>
          <p>
            That's the world that Ziwa is trying to create. From superior thermal retention capabilities, the leak proof
            design and an aesthetically pleasing vessel that is personalised your own way. We offer superior quality
            products for adults and kids in the sleeves of designs for the African Market.
          </p> -->

          <!-- <h3 class="text-gray-900 font-medium text-[36px] md:text-[36px] tracking-tight">Our mission </h3>
          <p>
            Ziwa's mission is to redefine the everyday beverage experience by crafting sustainable, stylish, and
            personalized stainless steel drinkware. We are committed to empowering individuals to express their unique
            identities through our products, fostering a culture of sustainability, innovation, and elevated enjoyment in
            every sip. At Ziwa, we believe in transforming the ordinary into the extraordinary, one vessel at a time. One
            sip at a time.
          </p> -->
        </div>
        <div class="md:col-span-5 h-auto">
          <!-- Image -->
          <div class="block order-first md:order-last">
            <img
              :src="about_img1"
              alt=""
              class="hidden md:flex w-[300px] h-[350px] mx-auto object-cover rounded-lg mb-5"
            />
            <img
              :src="about_img"
              alt=""
              class="flex w-[300px] h-[350px] mx-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
