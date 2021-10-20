import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../constants";

const createRequest = (url) => ({ url });

export const reastaurantApi = createApi({
    reducerPath: 'reastaurantApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getReastaurants: builder.query({
            query: () => createRequest(`/api/data`),
        }),
        
    }),
});
export const { useGetReastaurantsQuery } = reastaurantApi;