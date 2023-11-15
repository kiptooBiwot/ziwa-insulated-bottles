import slugify from "slugify";

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.slugify = slugify

})