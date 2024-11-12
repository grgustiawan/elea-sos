export interface IMenu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOffers {
  id: number;
  name: string;
  discount: number;
  menuId: number;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  menu: IMenu;
}

export interface IPromotion {
  id: number;
  name: string;
  description: string;
  menuId: number;
  validFrom: string;
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  menu: IMenu;
}

export interface ICategory {
  id: number,
  name: string,
  description: string,
  image: string
}

export interface IMenuList {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICategories {
  id: number;
  name: string;
  description: string;
  image: string;
  menus: IMenuList[];
}

export interface ICartItem {
  id: number,
  name: string,
  price: number,
  discount: number,
  quantity: number,
  image: string,
}

export interface IPaymentMethod {
  id: number,
  name: string,
  image: string,
}

export interface IRestaurantBranch {
  id: number;
  branchName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDishCategory {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: IDishCategory;
}

