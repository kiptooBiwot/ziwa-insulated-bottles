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
            Our journey began with a passion for creating products that seamlessly blend style, functionality, and
            sustainability. We wanted to provide a solution that would empower individuals to stay hydrated on their
            daily adventures, whether it's conquering mountains, chasing dreams, or simply navigating the ups and downs
            of life.
          </p>
          <p>
            Our flagship product, the Ziwa Insulated Water Bottle is thoughtfully designed with you in mind. From the
            sleek and durable construction to the advanced insulation technology, we leave no detail overlooked. We
            understand the importance of a bottle that keeps your drinks at the perfect temperature, so you can enjoy
            that refreshing burst of coolness or the comforting warmth whenever you need it most.
          </p>
          <p>
            The Ziwa Insulated Water bottle is a testament to self-expression and personal style. We offer a range of
            vibrant colors and patterns, allowing you to choose a bottle that reflects your unique personality. It's not
            just a hydration tool; it's a statement, an accessory that accompanies you on your journey, turning heads
            and sparking conversations along the way.
          </p>
          <p>
            But it's not just about the bottle; it's about the stories and moments that our products become a part of.
            We envision Ziwa as more than just a brand – it's a community of like-minded individuals who prioritize
            their well-being and strive for a healthier, more sustainable world. We are united by our shared commitment
            to staying hydrated and making conscious choices that positively impact both ourselves and the environment
            we cherish. Join us to create a brighter greener future a sip at a time.
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
  </section>
</template>


<style scoped></style>