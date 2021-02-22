import React, { createContext, useReducer, useContext } from 'react';

function deepAssign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var source = sources_1[_a];
        for (var key in source) {
            var s = source[key];
            if (Object(s) === s) {
                var t = target[key];
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

var reducerLogger = function (reducer, description) {
    if (description === void 0) { description = 'context'; }
    return function (state, action) {
        var log = {};
        log.actions = JSON.parse(JSON.stringify(action));
        log.before = JSON.parse(JSON.stringify(state));
        var after = reducer(state, action);
        log.after = JSON.parse(JSON.stringify(after));
        console.log(description, log);
        return after;
    };
};

var rootSelector = function (state) { return state; };
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createStore(reducer, initialState) {
    var Context = createContext({
        state: {},
        dispatch: function () { },
    });
    var Store = function (_a) {
        var children = _a.children;
        var _b = useReducer(reducer, deepAssign({}, initialState)), state = _b[0], dispatch = _b[1];
        return (React.createElement(Context.Provider, { value: { state: state, dispatch: dispatch } }, children));
    };
    function useStore(selector) {
        if (selector === void 0) { selector = rootSelector; }
        var _a = useContext(Context), state = _a.state, dispatch = _a.dispatch;
        return [selector(state), dispatch];
    }
    function useDispatch() {
        var dispatch = useContext(Context).dispatch;
        return dispatch;
    }
    function useState(selector) {
        if (selector === void 0) { selector = rootSelector; }
        var state = useContext(Context).state;
        return selector(state);
    }
    return { Store: Store, useStore: useStore, useDispatch: useDispatch, useState: useState };
}

export { createStore, deepAssign, reducerLogger };
//# sourceMappingURL=index.esm.js.map
