import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../reducers";

const store = configureStore({ 
    reducer: rootReducer, 
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
 });

export default store;
