export const useGeneralStore = defineStore('general', {
  state: () => ({
    isOpen: false,
    transactionData: false,
    newLinks: [
      { title: 'About', url: 'about-us' },
      { title: 'Bottles', url: '#Home' },
      { title: 'Tumblers', url: 'tumblers' },
      { title: 'Kids', url: 'kids' },
      { title: 'Bulk Custom', url: 'contact' },
      { title: 'Shop', url: '#Shop' },
      { title: 'Contact', url: 'contact' },
    ]
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
})