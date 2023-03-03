export { MenuArray, defaultMenuArray, defaultMenuArraySettings };
// ================== //
// *** Menu Model *** //
// ================== //
interface MenuArray {
  title: string;
  url: string;
  icon: string;
}
const defaultMenuArray: MenuArray[] = [
  {
    title: 'MENU.home',
    url: '',
    icon: 'home',
  },
  {
    title: 'MENU.menu',
    url: '/item-type',
    icon: 'list',
  },
  {
    title: 'MENU.Events',
    url: '/events',
    icon: 'aperture',
  },
];
const defaultMenuArraySettings: MenuArray[] = [
  {
    title: 'MENU.cPanel',
    url: '/cpanel',
    icon: 'cog',
  },
  // {
  //   title: 'QR Serves',
  //   url: '/QR/QRadd',
  //   icon: 'qr-code-outline',
  // },
  // {
  //   title: 'الموظفون',
  //   url: '/user/all',
  //   icon: 'people-outline',
  // },
];
// ================== //
// *** Menu Model *** //
// ================== //
