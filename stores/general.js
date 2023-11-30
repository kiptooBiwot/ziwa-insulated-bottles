export const useGeneralStore = defineStore('general', {
  state: () => ({
    isOpen: false,
    newLinks: [
      { title: 'About', url: 'about-us' },
      { title: 'Bottles', url: '#Home' },
      { title: 'Tumblers', url: '#Shop' },
      { title: 'Kids', url: '#Home' },
      { title: 'Bulk Custom', url: '#Contact' },
      { title: 'Shop', url: '#Shop' },
    ]
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
})