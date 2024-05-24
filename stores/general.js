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
          { title: 'Ziwa Bottle', url: '/item/ziwa-insulated-bottle', imageUrl: '/images/hero_2.png', id: '6554e7f1ed069baf070d7694' },
          { title: 'Msafiri Tumbler', url: '/item/msafiri-tumbler-the-hydration-dynamo', imageUrl: '/images/tumbler_1.png', id: '65ba57cdf8f16cdd0fbbcf94' },
          { title: 'Little Ziwa', url: '/item/kids-bottle', imageUrl: '/images/kids_navy.png', id: '664fb9cc4ffbdd783af1a648' },
        ]

      },
      // { title: 'Accessories', url: '/accessories', type: 'dropdown' },
      { title: 'Bulk Custom', url: '#', type: 'link' },
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