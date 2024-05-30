'use client';

import { useState, createContext } from 'react';

type ActiveUnitProviderProps = {
  activeUnit: string | null | undefined;
  children: React.ReactNode;
};

export const ActiveUnitProvider = ({
  activeUnit,
  children,
}: ActiveUnitProviderProps) => {
  const [currentActiveUnit, setCurrentActiveUnit] = useState(activeUnit);
  const ActiveUnitContext = createContext({
    currentActiveUnit,
    setCurrentActiveUnit,
  });

  return (
    <ActiveUnitContext.Provider
      value={{ currentActiveUnit, setCurrentActiveUnit }}
    >
      {children}
    </ActiveUnitContext.Provider>
  );
};
