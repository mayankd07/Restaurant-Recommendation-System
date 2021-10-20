import React from 'react'
import Navbar from './Navbar'

import { useGetRecommendedRestaurantsQuery } from "../services/restaurantDataApi";

function RecommendedRestaurant(props) {
    const city = props.match.params.cityName;
    const restaurant = props.match.params.restaurantName;
    const { data, error, isLoading } = useGetRecommendedRestaurantsQuery({ city: city, restaurant: restaurant });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops, an error occured</div>;
    }
    else {
        return (
            <>
                <Navbar />

            </>
        )
    }
}

export default RecommendedRestaurant
