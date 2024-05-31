

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    route: [
      {
        name: 'Thika Road Route',
        estate: [
          { estateName: 'CBD', cost: 100 },
          { estateName: 'Ngara', cost: 150 },
          { estateName: 'Pangani', cost: 150 },
          { estateName: 'Eastleigh', cost: 250 },
          { estateName: 'Survey', cost: 250 },
          { estateName: 'Garden City', cost: 300 },
          { estateName: 'Baba Dogo / Lucky Summer', cost: 350 },
          { estateName: 'Kahawa Sukari', cost: 500 },
          { estateName: 'Kahawa West', cost: 500 },
          { estateName: 'Kahawa Wendani', cost: 500 },
          { estateName: 'Kahawa Barracks', cost: 500 },
          { estateName: 'Clay City', cost: 350 },
          { estateName: 'Ruiru Area - Kamakis', cost: 600 },
          { estateName: 'Ruiru Area - Ruiru Ndani', cost: 600 },
          { estateName: 'Ruiru Area - Ruiru Campus', cost: 600 },
          { estateName: 'Ruiru Area - Zetech', cost: 600 },
          { estateName: 'Kenyatta Road', cost: 800 },
          { estateName: 'Juja', cost: 800 },
          { estateName: 'Thika', cost: 1200 },
          { estateName: 'AllSops', cost: 300 },
          { estateName: 'TRM / USIU / Roysambu', cost: 350 },
          { estateName: 'Zimmerman / Mirema / Thome', cost: 400 },
          { estateName: 'Kararani Area - Police Station', cost: 350 },
          { estateName: 'Kararani Area - Sunton', cost: 400 },
          { estateName: 'Kararani Area - Hunters', cost: 400 },
          { estateName: 'Kararani Area - Mwiki', cost: 500 },
        ]
      },
      {
        name: 'CBD',
        estate: [
          {
            estateName: 'Around CBD',
            cost: 100
          }
        ]
      },
      {
        name: 'Juja Road',
        estate: [
          {
            estateName: 'Pumwani',
            cost: 200
          },
          {
            estateName: 'Huruma',
            cost: 300
          },
        ]
      },
      {
        name: 'Kiambu Road',
        estate: [
          { estateName: 'Muthaiga', cost: 200 },
          { estateName: 'C.I.D', cost: 250 },
          { estateName: 'Runda', cost: 300 },
          { estateName: 'Thindigwa', cost: 350 },
          { estateName: 'Kirigiti', cost: 400 },
          { estateName: 'Kiambu', cost: 500 },
        ]
      },
      {
        name: 'Westlands Area',
        estate: [
          { estateName: 'Chiromo', cost: 200 },
          { estateName: 'Delta / Sarit', cost: 200 },
          { estateName: 'ABC Place', cost: 300 },
          { estateName: 'Kileleshwa Area', cost: 300 },
          { estateName: 'Ojijo / Raphta / Muthithi', cost: 200 },
        ]
      },
      {
        name: 'Waiyaki Way',
        estate: [
          { estateName: 'Kangemi', cost: 350 },
          { estateName: 'Mountain View', cost: 350 },
          { estateName: 'Kabete', cost: 400 },
          { estateName: 'Uthiru', cost: 400 },
          { estateName: 'Kinoo', cost: 500 },
        ]
      },
      {
        name: 'Mombasa Road',
        estate: [
          { estateName: 'Nyayo Stadium', cost: 200 },
          { estateName: 'Likoni Road', cost: 300 },
          { estateName: 'Nairobi West', cost: 300 },
          { estateName: 'Sameer Park', cost: 300 },
          { estateName: 'South B/C', cost: 300 },
          { estateName: 'Capital Center', cost: 300 },
          { estateName: 'Airtel Kenya', cost: 300 },
          { estateName: 'NextGen Mall', cost: 300 },
          { estateName: 'Panari Hotel', cost: 300 },
          { estateName: 'Imara Daima', cost: 350 },
          { estateName: 'Cabanas / Pipeline', cost: 400 },
          { estateName: 'Airport', cost: 400 },
          { estateName: 'Syokimau / SGR', cost: 450 },
          { estateName: 'Embakasi', cost: 500 },
          { estateName: 'Mlolongo', cost: 500 },
          { estateName: 'Kitengela', cost: 700 },
          { estateName: 'Athi River', cost: 800 },
        ]
      },
      {
        name: 'Jogoo Road',
        estate: [
          { estateName: 'City Stadium', cost: 200 },
          { estateName: 'Shauri Moyo', cost: 250 },
          { estateName: 'Makadara', cost: 300 },
          { estateName: 'BuruBuru', cost: 300 },
          { estateName: 'Komarock / Kayole', cost: 350 },
          { estateName: 'Donholm / Umoja', cost: 350 },
          { estateName: 'Pipeline', cost: 400 },
          { estateName: 'Kariobangi South', cost: 300 },
          { estateName: 'Kariobangi North', cost: 350 },
          { estateName: 'Tassia', cost: 400 },
          { estateName: 'Fedha', cost: 350 },
          { estateName: 'Harambee', cost: 400 },
        ]
      },
      {
        name: 'Ngong Road',
        estate: [
          { estateName: 'K.N.H', cost: 250 },
          { estateName: 'Coptic Hospital', cost: 250 },
          { estateName: 'Kilimani Area', cost: 250 },
          { estateName: 'Valley Arcade', cost: 250 },
          { estateName: 'Lavington Area', cost: 300 },
          { estateName: 'Kenyatta Market', cost: 300 },
          { estateName: 'T-Mall / Strathmore', cost: 250 },
          { estateName: 'Prestige Plaza', cost: 250 },
          { estateName: 'Adams Arcade', cost: 300 },
          { estateName: 'Impala', cost: 300 },
          { estateName: 'Riara Area / Makini', cost: 350 },
          { estateName: 'Junction Mall', cost: 350 },
          { estateName: 'Showground', cost: 350 },
          { estateName: 'Dagoretti', cost: 450 },
          { estateName: 'Ngong Racecourse', cost: 500 },
          { estateName: 'Kawangware', cost: 500 },
          { estateName: 'Karen Area', cost: 600 },
          { estateName: 'Ngong Town', cost: 700 },
        ]
      },
      {
        name: 'Limuru Road',
        estate: [
          { estateName: 'Forest Road', cost: 200 },
          { estateName: '1st-6th Parklands', cost: 250 },
          { estateName: 'UNEP', cost: 300 },
          { estateName: 'Village Market', cost: 300 },
          { estateName: 'Runda', cost: 350 },
          { estateName: 'Kitusuru', cost: 450 },
          { estateName: 'Two Rivers', cost: 450 },
          { estateName: 'Gen. Mathenge Rd.', cost: 300 },
          { estateName: 'Peponi', cost: 300 },
          { estateName: 'Loresho', cost: 350 },
          { estateName: 'Lower Kabete', cost: 350 },
          { estateName: 'Ruaka', cost: 400 }
        ]
      },
    ]
  }),
  actions: {

  }
}) 