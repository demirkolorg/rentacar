export const leftMenu = [
  {
    isHeadr: true,
    title: 'menu'
  },
  {
    title: 'Kartlar',
    icon: 'mdi:cards',
    link: 'kartlar',
    child: [
      {
        childtitle: 'Firma Kartları',
        childlink: 'firma',
        childicon: 'mdi:company'
      },
      {
        childtitle: 'Şube Kartları',
        childlink: 'sube',
        childicon: 'mdi:office-chair'
      },
      {
        childtitle: 'Pozisyon Kartları',
        childlink: 'pozisyon',
        childicon: 'gis:position-man'
      }
    ]
  },
  {
    title: 'Dashboard',
    icon: 'heroicons-outline:home',
    link: 'dashboard',
    child: [
      {
        childtitle: 'CRM Dashboard',
        childlink: 'crm',
        childicon: 'ri:customer-service-2-fill'
      },
      {
        childtitle: 'Banking Dashboard',
        childlink: 'banking',
        childicon: 'heroicons:wrench-screwdriver'
      }
    ]
  }
];
