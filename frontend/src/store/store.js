import { configureStore } from '@reduxjs/toolkit';

// Import the user reducer
import userReducer from './slices/userSlice';

// Import the API slices
import { userApi } from './apis/userApi';
import { taskApi } from './apis/taskApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, taskApi.middleware),
});
