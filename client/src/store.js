import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CreateSliceAuth from './createSlice';

const rootReducer = combineReducers({
  auth: CreateSliceAuth,
  // ...other reducers
});

const Store=configureStore({
    reducer:rootReducer
})

Store.subscribe(() => {
  const authState = Store.getState().auth.user;
  localStorage.setItem("LoginDetails", JSON.stringify(authState));
});

export default Store;