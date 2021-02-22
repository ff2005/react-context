# react-context

[![MIT License](https://img.shields.io/npm/l/react-native-template-iso-starter)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/react-16.8.0-68D3FC?logo=react)](https://reactjs.org/)
[![Typescript](https://img.shields.io/badge/typescript-4.1.5-007ACC?logo=typescript)](https://www.typescriptlang.org/)

Simple library for managing react context with hooks (and typescript).

## Installation

`npm install @ff2005/react-context`

## Usage

App.js
```javascript
import { PageContext } from './context';
import Page1 from "./Page1";
import Page2 from "./Page2";

function App() {
  return (
    <PageContext.Store>
      <Page1 />
      <Page2 />
    </PageContext.Store>
  );
}

export default App;
```

Page1.js
```javascript
import { useCallback } from 'react';
import { PageContext, incrementAction } from './context';

function Page1() {
  const dispatch = PageContext.useDispatch();

  const dec = useCallback(
    () => dispatch(incrementAction(-2)),
    [dispatch],
  );

  const inc = useCallback(
    () => dispatch(incrementAction(+2)),
    [dispatch],
  );

  return (
    <>
      <button onClick={dec}>-2</button>
      <button onClick={inc}>+2</button>
    </>
  );
}

export default Page1;
```

Page2.js
```javascript
import { PageContext, incrementSelector } from './context';

function Page2() {
  const increment = PageContext.useState(incrementSelector);

  return (
    <div>{increment}</div>
  );
}

export default Page2;
```

context.js
```javascript
import { createStore, deepAssign, reducerLogger } from '@ff2005/react-context';

const DEFAULT_CONTEXT = {
  page: {
    increment: 0
  }
}

const reducer = (state, { type, ...action }) => {
  switch (type) {
    case 'increment':
      const increment = state.page.increment + action.increment;
      return deepAssign({}, state, { page: { increment } });
      // return {
      //   ...state,
      //   page: {
      //     ...state.page,
      //     increment
      //   }
      // }
    default:
      return state;
  }
};

const PageContext = createStore(
  reducerLogger(reducer, 'page'),
  DEFAULT_CONTEXT,
);

const incrementAction = (increment) => ({
  type: 'increment',
  increment,
});

const incrementSelector = (state) => state.page.increment;

export { PageContext, incrementAction, incrementSelector }
```

## Hooks

- useStore - return [state, dispatch] for the store
- useDispatch - return only the dispatch for the store
- useState- return only the state for the store

## Contributing

Contributions are very welcome. Please check out the [contributing document](CONTRIBUTING.md).

## License

[MIT](LICENSE).