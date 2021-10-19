import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/data`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  },[]);
  const[recommendedRestaurants, setRecommendedRestaurant] = useState({})
  const postRestaurant = (e) => {
      
    fetch(
        
      `http://localhost:8000/restaurant/${selectedCity}/${selectedRestaurant}`
    )
      .then((response) => response.json())
      .then((data) => {
        //   setData(data)
        // console.log(data.recommendedRestaurants);
        setRecommendedRestaurant(data)
      });
      e.preventDefault()
  };
  console.log(recommendedRestaurants)

  const cities = [
    "Indore",
    "Bhopal",
    "Pune",
    "Bangalore",
    "Mumbai",
    "Hyderabad",
    "Delhi",
    "Chennai",
    "Noida",
    "Ahmedabad",
    "Ajmer",
    "Gurugram",
  ];
  const [selectedRestaurant, setRestaurant] = useState("");
  const [selectedCity, setCity] = useState("");
  const [restaurantList, setList] = useState([]);

  if (data) {
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
                    // console.log(data.restaurants[city])
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
                    //   console.log(e.target.value)
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
  } else {
    return <h1>Loading</h1>;
  }
};

export default Home;
