import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="https://api.time.com/wp-content/uploads/2016/03/angriest-whopper.jpg?w=824&quality=70"
            alt="Logo"
            width="40"
            height="34"
            className="d-inline-block align-text-top"
          />
          Restaurant Recommendation System
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
