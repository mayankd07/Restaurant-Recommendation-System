import Home from './components/Home';
import RecommendedRestaurant from './components/RecommendedRestaurant';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/recommedation/:cityName/:restaurantName" exact component={RecommendedRestaurant} />
         <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
