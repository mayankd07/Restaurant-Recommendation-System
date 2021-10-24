import React from 'react'
import Iframe from 'react-iframe'
import { Link } from "react-router-dom";
import { LoopCircleLoading } from 'react-loadingg';

import { useGetRecommendedRestaurantsQuery } from "../services/restaurantDataApi";

function RecommendedRestaurant(props) {

    const city = props.match.params.cityName;
    const restaurant = props.match.params.restaurantName;
    const { data, error, isLoading } = useGetRecommendedRestaurantsQuery({ city: city, restaurant: restaurant });
    if (isLoading) {
        return <LoopCircleLoading color={'#ffffff'}
        />;
    }
    if (error) {
        alert("Something Went Wrong")
        return <Link to={"/"} />;
    }
    else {

        return (
            <>
                <div className="row max-width">
                    <div className="content heading">
                        <h1 >Recommended Restaurants</h1>
                    </div> 
                    <div className='row w-100'>
                    {data.recommendedRestaurants.map((item) => 
                        
                            (<div className="col-lg-5 padd my-3">
                        <h3 className='resName'>{item[0]}</h3>
                                <Iframe url={item[1]} width="100%"
                                    height="450px"
                                    className='ifame'
                            allow='geolocation' />
                            </div >)
                    )}</div>
                </div>
            </>
        )
    }
}

export default RecommendedRestaurant
