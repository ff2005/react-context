import React, { createContext, useContext, useReducer } from 'react';
import { deepAssign } from './helpers';

export * from './helpers';

export interface Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: Context | any;
}

export interface Action extends Context {
  type: string;
}

export type Dispatch = React.Dispatch<Action>;
export type Reducer = React.Reducer<Context, Action>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Selector<C = Context> = (state: Context) => C | any;

export interface ContextProps {
  state: Context;
  dispatch: Dispatch;
}

export interface StoreProps {}

const rootSelector: Selector = (state) => state;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createStore(reducer: Reducer, initialState: Context) {
  const Context = createContext<ContextProps>({
    state: {},
    dispatch: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  });

  const Store: React.FC<StoreProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, deepAssign({} ,initialState));

    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  function useStore<C = Context>(
    selector: Selector<C> = rootSelector
  ): [C, Dispatch] {
    const { state, dispatch } = useContext(Context);
    return [selector(state), dispatch];
  }

  function useDispatch(): Dispatch {
    const { dispatch } = useContext(Context);
    return dispatch;
  }

  function useState<C = Context>(
    selector: Selector<C> = rootSelector
  ): C {
    const { state } = useContext(Context);
    return selector(state);
  }

  return { Store, useStore, useDispatch, useState };
}

export { createStore };
