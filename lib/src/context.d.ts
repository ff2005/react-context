import React from 'react';
export * from './helpers';
export interface Context {
    [key: string]: Context | any;
}
export interface Action extends Context {
    type: string;
}
export declare type Dispatch = React.Dispatch<Action>;
export declare type Reducer = React.Reducer<Context, Action>;
export declare type Selector<C = Context> = (state: Context) => C | any;
export interface ContextProps {
    state: Context;
    dispatch: Dispatch;
}
export interface StoreProps {
}
declare function createStore(reducer: Reducer, initialState: Context): {
    Store: React.FC<StoreProps>;
    useStore: <C = Context>(selector?: Selector<C>) => [C, React.Dispatch<Action>];
    useDispatch: () => Dispatch;
    useState: <C_1 = Context>(selector?: Selector<C_1>) => C_1;
};
export { createStore };
