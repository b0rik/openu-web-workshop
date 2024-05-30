'use client';

import { useState, createContext, Dispatch, SetStateAction } from 'react';

type ActiveUnitProviderProps = {
  activeUnit: string | null | undefined;
  children: React.ReactNode;
};

type ActiveUnitContextType = {
  currentActiveUnit: string | null | undefined;
  setCurrentActiveUnit: Dispatch<SetStateAction<string | null | undefined>>;
};

export const ActiveUnitContext = createContext<ActiveUnitContextType>({
  currentActiveUnit: null,
  setCurrentActiveUnit: () => {},
});

export const ActiveUnitProvider = ({
  activeUnit,
  children,
}: ActiveUnitProviderProps) => {
  const [currentActiveUnit, setCurrentActiveUnit] = useState(activeUnit);

  return (
    <ActiveUnitContext.Provider
      value={{ currentActiveUnit, setCurrentActiveUnit }}
    >
      {children}
    </ActiveUnitContext.Provider>
  );
};
