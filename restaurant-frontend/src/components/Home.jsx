import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx'
import { useGetRestaurantsQuery } from "../services/restaurantDataApi";
import { cities } from "../constants";

const Home = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();  
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
      <>
      <Navbar/>
      <div className="container center">
          <div className="form-group">
            <label>Select a city: </label>
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
            <button className="btn btn-success">
              <Link to={selectedCity === "" || selectedRestaurant === "" ? "/" : `/recommedation/${selectedCity}/${selectedRestaurant}` } >Submit</Link>
            </button>
          </div>
      </div>
      </>
    );
  }
};
export default Home;
