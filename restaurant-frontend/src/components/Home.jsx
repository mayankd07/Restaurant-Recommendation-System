import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetRestaurantsQuery } from "../services/restaurantDataApi";
import { cities } from "../constants";
import Select from "react-select";
import { LoopCircleLoading } from 'react-loadingg';
import plate from "../images/plate.png";

const Home = () => {
  const { data, error, isLoading } = useGetRestaurantsQuery();
  const [selectedRestaurant, setRestaurant] = useState("");
  const [selectedCity, setCity] = useState("");
  const [restaurantList, setList] = useState([]);
  
  if (isLoading) {
    return <LoopCircleLoading color={'#ffffff'}
    />;
  }
  if (error) {
    alert("Something Went Wrong")
    return <Link to={"/"} />;
  } else {
    return (
      <><br /><br />
        <div className="row max-width">
          <div className="col-lg-6 box">
            <div className="content">
              <h1>Restaurant Recommendation </h1>
              <h1>System</h1>
              <br />
              <h5 className="disabled-1">
                Choosing the best restaurant according to your preference is now just one click away. This recommender system is based on sentiment analysis of user's reviews and it's highly accurate. <br />Enjoy!
              </h5>
              <br /><br />
              <div className="disabled-1 row">
                <div className="col-lg-6">
                  <label>
                    <h3>Select a city:</h3>{" "}
                  </label>
                  <h5 className="input-1">
                    <Select
                      className="select"
                      placeholder="Select City"
                      options={cities.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      onChange={(e) => {
                        var city = "restaurant_" + e.value.toLowerCase();
                        setCity(e.value.toLowerCase());
                        setList(data.restaurants[city]);
                      }}
                    />
                  </h5>
                </div>
                <div className="col-lg-6">
                  <label>
                    <h3>Select a restaurant:</h3>{" "}
                  </label>
                  <h5 className="input-1">
                    <Select
                      className="select"
                      placeholder="Select Restaurant"
                      options={restaurantList.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      onChange={(e) => setRestaurant(e.value)}
                    />
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <img src={plate} className="front-image" alt="Money transfer"></img>
          </div>
        </div>

        <div className="container center ">
          <button className="btn btn-success" disabled={selectedCity === "" || selectedRestaurant === ""}>
            <Link
              to={`/recommedation/${selectedCity}/${selectedRestaurant}`}
            >
              Get Recommendation
            </Link>
          </button>
        </div>
        <br />
        <br />
      </>
    );
  }
};
export default Home;
