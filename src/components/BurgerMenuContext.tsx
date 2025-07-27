import { createContext, useContext, useState, ReactNode } from 'react';

type BurgerMenuContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const BurgerMenuContext = createContext<BurgerMenuContextType | undefined>(undefined);

export const useBurgerMenu = () => {
  const context = useContext(BurgerMenuContext);
  if (!context) {
    throw new Error('useBurgerMenu must be used within a BurgerMenuProvider');
  }
  return context;
};

type BurgerMenuProviderProps = {
  children: ReactNode;
};

export const BurgerMenuProvider = ({ children }: BurgerMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return <BurgerMenuContext.Provider value={{ isOpen, toggle, close }}>{children}</BurgerMenuContext.Provider>;
};
