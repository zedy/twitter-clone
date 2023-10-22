import React, { type FC, useState } from 'react';

export enum Step {
  'step1', 'step2'
}

interface ContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  step: Step;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const initialContext = {} as ContextProps;

export const SignupContext = React.createContext(initialContext);

export const SignupContextProvider: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<Step>(Step.step1);
  const [name, setName] = useState<string>('');
  const provide: ContextProps = {
    isLoading,
    setIsLoading,
    step,
    setStep,
    name,
    setName,
  };

  return (
    <SignupContext.Provider value={provide}>
      {children}
    </SignupContext.Provider>
  );
};