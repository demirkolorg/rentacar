import projectConfig from '@/configs/projectConfig';

export const leftMenu = [
  {
    isHeadr: true,
    title: 'menu'
  },
  {
    title: 'Grifin Yönetimi',
    icon: 'game-icons:griffin-symbol',
    link: 'grifinyonetimi',
    access: projectConfig.menuAccess.Grifin,
    child: [
      {
        childtitle: 'Firma Yönetimi',
        childlink: 'firma',
        childicon: 'mdi:company'
      },
      {
        childtitle: 'Şube Yönetimi',
        childlink: 'sube',
        childicon: 'mdi:office-chair'
      },
      {
        childtitle: 'Kullanıcı Yönetimi',
        childlink: 'kullanici',
        childicon: 'clarity:users-solid'
      },
    ]
  },
  {
    title: 'Firma Yönetimi',
    icon: 'mingcute:building-6-fill',
    link: 'firmayonetimi',
    access: projectConfig.menuAccess.Firma,
    child: [
      {
        childtitle: 'Şube Yönetimi',
        childlink: 'sube',
        childicon: 'mdi:office-chair'
      },
      {
        childtitle: 'Kullanıcı Yönetimi',
        childlink: 'kullanici',
        childicon: 'clarity:users-solid'
      },
    ]
  },
  {
    title: 'Şube Yönetimi',
    icon: 'heroicons-solid:office-building',
    link: 'subeyonetimi',
    access: projectConfig.menuAccess.Sube,
    child: [
      {
        childtitle: 'Kullanıcı Yönetimi',
        childlink: 'kullanici',
        childicon: 'clarity:users-solid'
      },
    ]
  },
  {
    title: 'Kartlar',
    icon: 'mdi:cards',
    link: 'kartlar',
    access: projectConfig.menuAccess.All,
    child: [
      {
        childtitle: 'Pozisyon Kartları',
        childlink: 'pozisyon',
        childicon: 'gis:position-man'
      }
    ]
  }
];
