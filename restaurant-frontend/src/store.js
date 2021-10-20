import { configureStore } from "@reduxjs/toolkit";
import { reastaurantApi } from "./services/restaurantDataApi";

export default configureStore({
    reducer: {
        [reastaurantApi.reducerPath]: reastaurantApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reastaurantApi.middleware),
})