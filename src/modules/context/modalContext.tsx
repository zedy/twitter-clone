import React, { type FC, useState } from 'react';

interface ContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext = {} as ContextProps;

export const ModalContext = React.createContext(initialContext);

export const ModalContextProvider: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const provide: ContextProps = {
    isLoading,
    setIsLoading,
  };

  return (
    <ModalContext.Provider value={provide}>
      {children}
    </ModalContext.Provider>
  );
};