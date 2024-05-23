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
    ],
    leftLinks: [
      {
        title: 'Drinkware',
        url: '/drinkware',
        type: 'dropdown',
        isOpen: false,
        children: [
          { title: 'Ziwa Bottle', url: '', imageUrl: '/images/hero_2.png' },
          { title: 'Msafiri Tumbler', url: '', imageUrl: '/images/tumbler_1.png' },
          { title: 'Little Ziwa', url: '', imageUrl: '/images/kids_navy.png' },
        ]
      },
      // { title: 'Accessories', url: '/accessories', type: 'dropdown' },
      { title: 'Bulk Custom', url: '/bulk-custom', type: 'link' },
    ],

    rightLinks: [
      { title: 'Blog', url: '/blog' },
      { title: 'Contact', url: '/contact' },
      { title: 'Account', url: '/account' },
      // { title: '', url: '' },
    ],

    bestSellers: [
      { title: 'Ziwa Bottle', image: '/images/hero_2.png' },
      { title: 'Msafiri Tumbler', image: '/images/tumbler_1.png' },
      { title: 'Little Ziwa', image: '/images/kids_navy.png' },
    ]

  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
})