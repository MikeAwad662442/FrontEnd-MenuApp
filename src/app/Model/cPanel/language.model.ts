export {
  Language,
  LanguageArray,
  LanguageActive,
  defaultLanguage,
  AllLanguage,
};

interface Language {
  id: string;
  name: string;
  direction: string;
  active: boolean;
  default: boolean;
}

interface LanguageArray {
  languages: {
    id: string;
    name: string;
    direction: string;
    active: boolean;
    default: boolean;
  };
}
interface LanguageActive {
  id: string;
}
// interface LanguageLocalStorage {
//   id: string;
//   direction: string;
//   active: boolean;
// }
// === The Default Languages in API === //
const defaultLanguage: Language[] = [
  {
    id: 'ar',
    name: 'Arabic',
    direction: 'rtl',
    active: false,
    default: false,
  },
  {
    id: 'en',
    name: 'English',
    direction: 'ltr',
    active: true,
    default: true,
  },
  {
    id: 'fr',
    name: 'French',
    direction: 'ltr',
    active: false,
    default: false,
  },
];
// === The Default Languages in API === //
interface AllLanguage {
  language: string;
  name: string;
  description: string;
}
