import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formReducer from "./formReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
	forms: formReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware().concat(thunk)})

export default store