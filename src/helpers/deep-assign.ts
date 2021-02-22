import { Context } from '../context';

export function deepAssign(target: Context, ...sources: Context[]): Context {
  for (const source of sources) {
    for (const key in source) {
      const s = source[key];
      if (Object(s) === s) {
        const t = target[key];
        if (Object(t) === t) {
          target[key] = Object.create(deepAssign(t, s));
          continue;
        }
        target[key] = Object.create(deepAssign({}, s));
        continue;
      }
      target[key] = source[key];
    }
  }
  return target;
}
