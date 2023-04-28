export { ItemTypes, ItemTypesLanguage, Items, ItemsLanguage };
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
// === ItemTypes DB === //
interface Items {
  id: any;
  ItemTypeID: any;
  listNum: any;
  image: string;
  imgType: string;
  active: boolean;
  price: number;
  info: [ItemsLanguage];
}
interface ItemsLanguage {
  id: any;
  ItemID: any;
  lang: string;
  name: string;
  description: string;
}
// ======================= //
// *** Item Model ******** //
// ======================= //
