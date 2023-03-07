import { AllLanguage } from '../cPanel/language.model';

export { ItemType, AllLanguage, Item };
// ======================= //
// *** Item Type Model *** //
// ======================= //
// = Category of Items = //
// ===================== //

// id             =>  UUID
// image          =>  Link the image in the Folder
// imgType        =>  Type of the images
// active         =>  is this item is active or not
// name_ar        =>  Name of item
// description_ar =>  description of item
// name_en        =>  Name of item
// description_en =>  description of item
// name_fr        =>  Name of item
// description_fr =>  description
interface ItemType {
  id: any;
  image: string;
  imgType: string;
  active: boolean;
  info: [AllLanguage];
}
// interface AllLanguage {
//   name: string;
//   description: string;
// }
// ======================= //
// *** Item Type Model *** //
// *** Item Model ******** //
// ======================= //
interface Item {
  id: any;
  typeID: any;
  image: any;
  imgType: string;
  active: boolean;
  price: number;
  priceView: boolean;
  arN: string;
  arD: string;
  enN: string;
  enD: string;
  frN: string;
  frD: string;
}
// ======================= //
// *** Item Model ******** //
// ======================= //
