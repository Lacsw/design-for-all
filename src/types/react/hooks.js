// @ts-check
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

/**
 * I was looking for a convenient `useState` typing, first I found this
 * approach.
 *
 * @deprecated Use `React.useState` with special types annotating instead!.\
 *   See `UseStateHack` as example.
 * @template T
 * @param {T} initialValue
 */
export const _useState = (initialValue) => {
  const state = React.useState(initialValue);
  const value = state[0];
  const setter = state[1]; // eslint will tell you add setter in dependency array, bad

  // @ts-ignore
  /** @type {const} */
  const res = [value, setter];
  return res;
};

/**
 * Just for example.
 *
 * @param {never} props
 */
const UseStateHack = (props) => {
  const [state, setState] = /** @type {TState<'litA' | 'numeroFinco'>} */ (
    useState('litA')
  ); // NOTE: need extra parentheses around hook calling!!!

  /* try to change useState on _useState and see on useEffect - eslint will\
    ask to add setState on dependency array
    (if eslint-config has rule "react-hooks/exhaustive-deps") */

  useEffect(() => {
    // intellisense works!
    if (state === 'numeroFinco') {
      setState('litA');
    } else {
      // ...
    }
  }, [state]);

  // return ( ... )
};
