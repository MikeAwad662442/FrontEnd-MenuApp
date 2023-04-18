// import { AllLanguage } from '../cPanel/language.model';

import { AllLanguage } from 'src/app/Model/cPanel/language.model';

export { Events, FullEvents, EventsLanguage };
// ================ //
// ==== Events ==== //
// ================ //
// === interface on BackEnd
//   export interface EventsFull {
//     EventsID: any;
//     File: any;
//     EventsImageType: string;
//     EventsActive: any;
//     EventsInfoArray: [EventsLanguage];
//   }
//   // === Group Events & Language === //

// === interface on BackEnd
// id             =>  UUID
// image          =>  Link the image in the Folder
// imgType        =>  Type of the images
// active         =>  is this item is active or not
interface FullEvents {
  eventsGat: [Events];
  LangDB: string;
}

// === Events DB === //
//   export interface Events {
//     id: any;
//     image: string;
//     imgType: string;
//     active: boolean;
// }
/**
 * Use in PAGES
 * Events / all
 * Events / info
 */
interface Events {
  id: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
  info: [EventsLanguage];
}
// same interface usd in Server Said
interface EventsLanguage {
  id: any;
  EventID: any;
  lang: string;
  name: string;
  description: string;
}
// interface AllLanguage {
//   language: string;
//   name: string;
//   description: string;
// }
