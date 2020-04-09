import * as React from "react";

export const all = Object.freeze({
  title: "all([...effects])",
  children: (
    <>
      Creates an Effect description that instructs the middleware to run
      multiple Effects in parallel and wait for all of them to complete.
      It&apos;s quite the corresponding API to standard Promise.all
    </>
  ),
});

export const call = Object.freeze({
  title: "call(fn, ...args)",
  children: `Creates an Effect description that instructs the middleware to call the function fn with args as arguments:

o fn: a Generator function / normal function which returns a Promise or any value
o args: any[]`,
});

export const put = Object.freeze({
  title: "put(action)",
  children: `Schdules an action to the store's saga task queue.
        
By default: The code next line will be executed after yield put(action).
Unless, if you have other Redux middleware with asynchronous flow that delay the propagation of the action.
  
Downstream errors(ie. from the reducer) will be bubbled up.`,
});

export const select = Object.freeze({
  title: "select(selector, ...args)",
  children: `Create an effect that instructs the middleware to invoke the provided selector on the current Store's state.

o selector?: function (state, ...args) that takes in the current state and optionally some argument and return a slice of current store state
  
If select is called without arguments, it returns getState() call`,
});

export const take = Object.freeze({
  title: "take(pattern)",
  children: `Creates an Effect description that instructs the middleware to wait for a specified action on the Store.
The Generator is suspended until an action that matches the pattern is dispatched.
  
The result of yield take(pattern) is an action object being dispatched.
  
The benefit of take over takeEvery is that you can control the number of times it can be called.`,
});

export const takeEvery = Object.freeze({
  title: "takeEvery(pattern, saga, ...args)",
  children: `Spawns a saga on each action dispatched to the Store that matches pattern.

o pattern: String | Array | Function - for more information see docs for take(pattern)
  
o saga: a Generator function
  
o args: Array<any> - arguments to be passed to the started task. takeEvery will add the incoming action to the argument list (i.e. the action will be the last argument provided to saga)`,
});

export const takeLatest = Object.freeze({
  title: "takeLatest(pattern, saga, ...args)",
  children: (
    <>
      Basically the same as <b>takeEvery</b> except that only one Saga can be
      run at any moment. If a previous Saga is still running, the previous Saga
      will automatically be cancelled.
    </>
  ),
});
