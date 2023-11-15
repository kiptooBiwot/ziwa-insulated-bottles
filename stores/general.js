export const useGeneralStore = defineStore('general', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
})