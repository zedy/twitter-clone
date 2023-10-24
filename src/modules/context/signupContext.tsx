import React, { type FC, useReducer } from 'react';

export enum Step {
  'step1', 'step2', 'step3',
}

interface ReducerStateProps {
  isLoading: boolean;
  step: Step;
  fields: {
    name: string;
    email: string;
    password: string;
    username: string;
    dob: Date;
  },
}

interface Payload {
  username?: string;
  dob?: Date;
  password?: string;
  name?: string;
  email?: string;
  isLoading?: boolean;
  step?: Step;
}

interface ContextProps {
  state: ReducerStateProps;
  dispatch: React.Dispatch<Action>;
}

export type Action = {
  type: 'basic_info' | 'password' | 'final' | 'setLoading' | 'reset' | 'step',
  payload?: Payload
};

const initialContext = {} as ContextProps;
const INITIAL_STATE: ReducerStateProps = {
  fields: {
    name: '',
    email: '',
    password: '',
    username: '',
    dob: new Date(),
  },
  step: Step.step1,
  isLoading: false,
};

export const SignupContext = React.createContext(initialContext);

const contextReducer = (state: ReducerStateProps, action: Action) => {
  switch (action.type) {
    case 'step':
      return {
        ...state,
        step: action.payload?.step,
      };
    case 'reset':
      return {
        ...INITIAL_STATE,
      };
    case 'basic_info':
      return {
        ...state,
        fields: {
          ...state.fields,
          ...action.payload
        },
        step: Step.step2
      };
    case 'password':
      return {
        ...state,
        fields: {
          ...state.fields,
          ...action.payload
        },
      };
    case 'final':
      return {
        ...state,
        step: Step.step3
      };
    case 'setLoading':
      return {
        ...state,
        isLoading: action?.payload?.isLoading ?? false,
      };
    default:
      return state;
  }
}

export const SignupContextProvider: FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE);
  const provide: ContextProps = {
    state,
    dispatch
  };

  return (
    <SignupContext.Provider value={provide}>
      {children}
    </SignupContext.Provider>
  );
};