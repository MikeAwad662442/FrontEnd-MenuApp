// import { AllLanguage } from '../cPanel/language.model';

import { AllLanguage } from 'src/app/Model/cPanel/language.model';

export { Events };
// ================ //
// ==== Events ==== //
// ================ //

// id             =>  UUID
// image          =>  Link the image in the Folder
// imgType        =>  Type of the images
// active         =>  is this item is active or not

interface Events {
  id: any;
  image: string;
  imgType: string;
  active: boolean;
  info: AllLanguage;
}
// interface AllLanguage {
//   language: string;
//   name: string;
//   description: string;
// }
