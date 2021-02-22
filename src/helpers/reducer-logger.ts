import { Action, Context, Reducer } from '../context';

export const reducerLogger = (reducer: Reducer, description: string = 'context'): Reducer => {
  return (state: Context, action: Action) => {
    const log: any = {};
    log.actions = JSON.parse(JSON.stringify(action));
    log.before = JSON.parse(JSON.stringify(state));
    const after = reducer(state, action);
    log.after = JSON.parse(JSON.stringify(after));
    console.log(description, log);
    return after;
  };
};
