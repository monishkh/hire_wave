
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import jobSlice from "./jobSlice";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import CompanySlice from "./CompanySlice";
import ApplicationSlice from "./Application.Slice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    auth: AuthSlice,
    job: jobSlice,
    company: CompanySlice,
    application: ApplicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)





const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store
