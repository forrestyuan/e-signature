import React from "react";

export function createStore<T>(
  ClassFactory: new () => T
): [() => T, T, React.Context<T>] {
  let store = new ClassFactory();
  let context = React.createContext(store);
  let useStore = () => React.useContext(context);
  return [useStore, store, context];
}
