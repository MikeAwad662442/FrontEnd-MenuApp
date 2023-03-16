/**
 * Export
 * Social Media InterFace
 * Default Social Media
 */
import { Facility } from './facility.model';
export { FullSocialMedia, SocialMedia, defaultSocialMedia };

interface FullSocialMedia {
  cSocialGet: [SocialMedia];
  cFacilityGet: Facility;
}
interface SocialMedia {
  id: string;
  icon: string;
  link: string;
  active: boolean;
}

const defaultSocialMedia: SocialMedia[] = [
  {
    id: 'facebook',
    icon: 'logo-facebook',
    link: 'https://www.facebook.com/',
    active: false,
  },
  {
    id: 'instagram',
    icon: 'logo-instagram',
    link: 'https://www.instagram.com/',
    active: false,
  },
  {
    id: 'twitter',
    icon: 'logo-twitter',
    link: 'https://twitter.com',
    active: false,
  },
  {
    id: 'youtube',
    icon: 'logo-youtube',
    link: 'https://www.youtube.com/',
    active: false,
  },
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    link: 'XXX - XXX XXX XXX',
    active: false,
  },
];
