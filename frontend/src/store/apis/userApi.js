import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api", }),
    endpoints: (builder) => {
        return {
            register: builder.mutation({
                query: (newUser) => ({
                    url: '/users',
                    method: 'POST',
                    body: newUser,
                }),
            }),
            login: builder.mutation({
                query: (credentials) => ({
                    url: '/users/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
        }
    }
});

export const { useLoginMutation, useRegisterMutation } = userApi;
