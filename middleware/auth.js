import { storeToRefs } from "pinia"
import { useUserStore } from "~/stores/user"

export default defineNuxtRouteMiddleware((to, from) => {

  // make authenticated state reactive
  const { authenticated } = storeToRefs(useUserStore())
  // get token from cookies
  const token = useCookie('token')
  // if token exists, update authenticated state in store
  if (token.value) {
    authenticated.value = true
  }

  // console.log('TO: ', to);
  // console.log('FROM: ', from);
  // if token exists and  url is /signin redirect to dashboard
  if (token.value && to.name == 'signin') {
    console.log('TOKEN EXISTS & URL IS SIGNIN');
    return navigateTo('/dashboard')
  }

  // if token doesn't exist redirect to login
  // if (!token.value && to?.name == 'signin') {
  //   console.log('NO TOKEN VALUE && NAME == SIGNIN');
  //   abortNavigation()
  //   return navigateTo('/signin')
  // }

  if (token.value == undefined && authenticated.value == false) {
    abortNavigation()
    return navigateTo('/signin')
  }

  // If logged in, never show signin page ever
  if (authenticated.value == true && to.name == 'signin') {
    abortNavigation()
    return navigateTo('/dashboard')
  }
})
