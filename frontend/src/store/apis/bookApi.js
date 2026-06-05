import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    tagTypes: ['Book'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => {
        return {
            getBooks: builder.query({
                query: () => '/books',
                providesTags: ['Book'],
            }),
            getBook: builder.query({
                query: (id) => `/books/${id}`,
                providesTags: ['Book'],
            }),
            createBook: builder.mutation({
                query: (newBook) => ({
                    url: '/books',
                    method: 'POST',
                    body: newBook,
                }),
                invalidatesTags: ['Book'],
            }),
            updateBook: builder.mutation({
                query: ({ id, ...data }) => ({
                    url: `/books/${id}`,
                    method: 'PUT',
                    body: data,
                }),
                invalidatesTags: ['Book'],
            }),
            deleteBook: builder.mutation({
                query: (id) => ({
                    url: `/books/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Book'],
            }),
        };
    },
});

export const { useGetBooksQuery, useGetBookQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = bookApi;
