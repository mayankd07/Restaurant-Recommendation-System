import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from "../constants";

const createRequest = (url) => ({ url });

export const restaurantApi = createApi({
    reducerPath: 'restaurantApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getRestaurants: builder.query({
            query: () => createRequest(`/api/data`),
        }),
        getRecommendedRestaurants: builder.query({
            query: ({city, restaurant}) => createRequest(`/restaurant/${city}/${restaurant}`),
        }),
        
    }),
});
export const { useGetRestaurantsQuery, useGetRecommendedRestaurantsQuery } = restaurantApi;