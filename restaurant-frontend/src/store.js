import { configureStore } from "@reduxjs/toolkit";
import { restaurantApi } from "./services/restaurantDataApi";

export default configureStore({
    reducer: {
        [restaurantApi.reducerPath]: restaurantApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(restaurantApi.middleware),
})