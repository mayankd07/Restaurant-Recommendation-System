import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar.jsx'
import { useGetRestaurantsQuery } from "../services/restaurantDataApi";
import { cities } from "../constants";
import Select from 'react-select';


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
      <div className="container center ">
          <div className="form-group">
            <label>Select a city: </label>
            <div className="col-6">
              <h5 className="input-1">
                <Select
                  // className="form-control"
                  className="width"
                  placeholder= "Select City"
                  options = {cities.map((item)=>(
                    {value: item, label: item}
                  ))}
                  onChange={(e) => {
                    var city = "restaurant_" + e.value.toLowerCase();
                    setCity(e.value.toLowerCase());
                    setList(data.restaurants[city]);
                  }}
                  
                />
              </h5>
            </div>
          </div>
          <div className="form-group">
            <label>Select a restaurant: </label>
            <div className="col-6">
              <h5 className="input-1">
              <Select
                  // className="form-control"
                  className="width"
                  placeholder= "Select Restaurant"
                  options = {restaurantList.map((item)=>(
                    {value: item, label: item}
                  ))}
                  onChange={(e) =>
                    setRestaurant(e.value)
                  }
                  
                />
                    
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
