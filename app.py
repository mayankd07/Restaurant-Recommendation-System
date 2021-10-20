from enum import unique
from flask import Flask, json, render_template, jsonify,request
from pymongo import  collection, cursor
import dns
import pymongo
import certifi
import pickle
import pandas as pd
import pathlib
from flask_cors import CORS, cross_origin




app = Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


cityNames = [
    "restaurant_indore",
    "restaurant_bhopal",
    "restaurant_pune",
    "restaurant_bangalore",
    "restaurant_mumbai",
    "restaurant_hyderabad",
    "restaurant_delhi",
    "restaurant_chennai",
    "restaurant_noida",
    "restaurant_ahmedabad",
    "restaurant_ajmer",
    "restaurant_gurugram",
  ]
cityRestaurants = {}
try:
    mongo = pymongo.MongoClient("mongodb+srv://kushal:kushal@restaurant-recommendati.p96gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",tlsCAFile=certifi.where())
    mongo.server_info() #Triggers exception if can't connect to database
    # initializing the database
    db = mongo.restaurant
    # reffering to the first collection in the database 
    for i in cityNames:
        restaurantNames = []
        collection = db.get_collection(i)
        cursor = collection.find({})
    # appending all the restaurant names inside this list
        for doc in cursor:
            restaurantNames.append(doc["showName"])
        uniqueRestaurantNames = list(set(restaurantNames))
        uniqueRestaurantNames.sort()

        cityRestaurants[i] = uniqueRestaurantNames   
    
  


except Exception as e:
    # print("Error -- Cannot connect to database")
    print(e)

# defining home route
# @app.route("/", methods =['GET', 'POST'])
# def home():

   
#     return render_template('index.html')

@app.route("/api/data")
@cross_origin(origin='*')
def getData():
    return jsonify({'restaurants': cityRestaurants})




@app.route("/restaurant/<cityName>/<restaurantName>")
@cross_origin(origin='*')
def getRecommendation(cityName, restaurantName):

    restaurantName = ' '+restaurantName
    abspathCosine = pathlib.Path("files/cosine_sim_"+cityName+".pickle").absolute()
    abspathIndices = pathlib.Path("files/indices_"+cityName+".csv").absolute()

    recommended_restaurant = []  
    indices = pd.read_csv(abspathIndices)
    indices = indices["name"]
    with open(abspathCosine, 'rb') as f:

        cosine_sim = pickle.load(f)
    # restaurant match indices
    idx = indices[indices == restaurantName].index[0]
    # similarity scores
    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
    # top n
    top_n_indexes = list(score_series.iloc[1:11].index)
    for i in top_n_indexes:
        recommended_restaurant.append(list(indices)[i])
     #df = pd.DataFrame(recommended_restaurant)   
    print(recommended_restaurant)
    return jsonify({"recommendedRestaurants":recommended_restaurant})

if __name__ == "__main__":
    app.run(debug=True, port = 8000)