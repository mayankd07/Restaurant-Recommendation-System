import React, { useState } from "react";
import { useGetReastaurantsQuery } from "../services/restaurantDataApi";
import { cities ,baseUrl } from "../constants";

const Home = () => {
  const { data, error, isLoading } = useGetReastaurantsQuery();
  const [recommendedRestaurants, setRecommendedRestaurant] = useState({})
  const postRestaurant = (e) => {
    fetch(
      `${baseUrl}/restaurant/${selectedCity}/${selectedRestaurant}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecommendedRestaurant(data)
      });
    e.preventDefault()
  };
  console.log(recommendedRestaurants)

  
  const [selectedRestaurant, setRestaurant] = useState("");
  const [selectedCity, setCity] = useState("");
  const [restaurantList, setList] = useState([]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops, an error occured</div>;
  }
  else {
    return (
      <div className="container center">
        <form method="GET" onSubmit={postRestaurant} >
          <div className="form-group">
            <label>select a city: </label>
            <div className="col-6">
              <h5 className="input-1">
                <select
                  className="form-control"
                  onChange={(e) => {
                    var city = "restaurant_" + e.target.value.toLowerCase();
                    setCity(e.target.value.toLowerCase());
                    setList(data.restaurants[city]);
                  }}
                  defaultValue=""
                >
                  <option disabled={true} value="">
                    Select City
                  </option>
                  {cities.map((item) => (
                    <option
                      value={item}
                      key={item}
                      onChange={(e) => console.log("HELLO")}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </h5>
            </div>
          </div>
          <div className="form-group">
            <label>Select a restaurant: </label>
            <div className="col-6">
              <h5 className="input-1">
                <select
                  className="form-control"
                  onChange={(e) =>
                    setRestaurant(e.target.value)
                  }
                  defaultValue=""
                >
                  <option disabled={true} value="">
                    Select Restaurant
                  </option>
                  {restaurantList.map((item) => (
                    <option
                      value={item}
                      key={item}
                      onChange={(e) => console.log("HELLO")}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </h5>
            </div>
          </div>
          <div className="container">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
};
export default Home;
