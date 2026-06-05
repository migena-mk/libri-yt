import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { userApi } from './apis/userApi';
import { bookApi } from './apis/bookApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, bookApi.middleware),
});
