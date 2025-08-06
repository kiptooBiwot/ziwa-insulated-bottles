export const useGeneralStore = defineStore('general', {
  state: () => ({
    isOpen: false,
    transactionData: false,
    newLinks: [
      { title: 'About', url: 'about-us' },
      { title: 'Bottles', url: '/shop/big-bottle' },
      { title: 'Tumblers', url: '/shop/tumblers' },
      { title: 'Kids', url: 'kids' },
      { title: 'Bulk Orders', url: 'bulk-orders' },
      // { title: 'Shop', url: '#Shop' },
      { title: 'Contact', url: 'contact' },
    ],
    leftLinks: [
      {
        title: 'Drinkware',
        url: '/drinkware',
        type: 'dropdown',
        isOpen: false,
        children: [
          { title: 'Ziwa Bottle', category: 'big-bottle', url: '/item/ziwa-insulated-bottle', imageUrl: '/images/hero_2.png', id: '6554e7f1ed069baf070d7694' },
          { title: 'The Ziwa 3.0', category: 'ziwa-3.0', url: '/item/ziwa-3.0', imageUrl: '/images/sage-1000.png', id: '6554e7f1ed069baf070d7695' },
          { title: 'Msafiri Tumbler', category: 'tumblers', url: '/item/msafiri-tumbler-the-hydration-dynamo', imageUrl: '/images/tumbler_1.png', id: '65ba57cdf8f16cdd0fbbcf94' },
          { title: 'Little Ziwa', category: 'kids-bottle', url: '/item/kids-bottle', imageUrl: '/images/kids_navy.png', id: '664fb9cc4ffbdd783af1a648' },
        ]

      },
      {
        title: 'Accessories',
        url: '/msafiri-boot',
        type: 'dropdown',
        isOpen: false,
        children: [
          {
            title: 'Msafiri Boot',
            category: 'msafiri-boot',
            imageUrl: '/images/boot_aqua_purple_white.png',
            id: ''
          },
          {
            title: 'Leak-Proof Lids',
            category: 'leak-proof-lids',
            imageUrl: '/images/toffee-lid.png',
            id: ''
          },
        ]
      },
      {
        title: 'Special Editions',
        url: '/special-ed',
        type: 'dropdown',
        isOpen: false,
        children: [
          {
            title: 'Christmas Edition',
            category: 'xmas-edition',
            imageUrl: '/images/x-jungle-green-xmas.png',
            id: ''
          }
        ]
      },
      { title: 'Bulk Custom', url: '/bulk-orders', type: 'link' },
    ],

    rightLinks: [
      // { title: 'Blog', url: '/blog' },
      { title: 'Contact', url: '/contact' },
      { title: 'Account', url: '/signin' },
      // { title: '', url: '' },
    ],

    bestSellers: [
      { title: 'Ziwa Bottle', image: '/images/hero_2.png', category: 'big-bottle' },
      { title: 'Msafiri Tumbler', image: '/images/tumbler_1.png', category: 'tumblers' },
      { title: 'Little Ziwa', image: '/images/kids_navy.png', category: 'kids-bottle' },
    ],

    // Christmas Edition images
    // bestSellers: [
    //   { title: 'Ziwa Bottle', image: '/images/xmas-ziwa-bottle.jpeg', category: 'big-bottle' },
    //   { title: 'Msafiri Tumbler', image: '/images/xmass-ziwa-tumbler.jpeg', category: 'tumblers' },
    //   { title: 'Little Ziwa', image: '/images/kids_navy.png', category: 'kids-bottle' },
    // ],

    // All Categories
    categories: null

  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },


    async getAllCategories() {
      try {
        // const categories = await $fetch('/category/getAllCategories', {
        //   method: 'GET'
        // })

        const categories = await $fetch('/category/getAllCategories', {
          method: 'GET'
        })

        console.log('CATEGORIES:', categories);
        if (categories) {
          this.categories = categories
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})