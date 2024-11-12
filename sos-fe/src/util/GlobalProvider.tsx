import React, { createContext, useContext, ReactNode } from 'react';
import { ICartItem } from '../interface';

interface GlobalContextType {
  formatPrice: (value: number) => string;
  findCartItem: (menuItems: ICartItem[], id: number) => ICartItem | undefined;
  getCategoryImage: (name: string) => string;
  getFoodImage: (name: string) => string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const formatPrice = (value: number): string => {
    let val: string = (value / 1).toFixed(0).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const findCartItem = (menuItems: ICartItem[], id: number): ICartItem | undefined => {
    return menuItems.find((item) => item.id === id);
  };

  const getCategoryImage = (name: string): string => {
    return "http://localhost:6100/api/image/category?filename=" + name
  };

  const getFoodImage = (name: string): string => {
    return "http://localhost:6100/api/image/food?filename=" + name
  };

  return (
    <GlobalContext.Provider value={{ formatPrice, findCartItem, getFoodImage, getCategoryImage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
