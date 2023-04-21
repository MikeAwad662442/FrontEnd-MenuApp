export { ItemTypes, ItemTypesLanguage, Item };
// ======================= //
// *** Item Type Model *** //
// ======================= //
// === ItemTypes DB === //
interface ItemTypes {
  id: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
  info: [ItemTypesLanguage];
}
interface ItemTypesLanguage {
  id: any;
  ItemTypeID: any;
  lang: string;
  name: string;
  description: string;
}
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
