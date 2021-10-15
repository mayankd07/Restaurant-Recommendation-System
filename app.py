from enum import unique
from flask import Flask, json, render_template, jsonify
from pymongo import  collection, cursor
from wtforms import SelectField
from flask_wtf import FlaskForm
import dns
import pymongo
import certifi
from restaurant_recommender.gurugram import get_recommendation_gurugram 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'

restaurantNames = []
cityNames = []
try:
    mongo = pymongo.MongoClient("mongodb+srv://kushal:kushal@restaurant-recommendati.p96gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",tlsCAFile=certifi.where())
    mongo.server_info() #Triggers exception if can't connect to database
    # initializing the database
    db = mongo.restaurant
    # reffering to the first collection in the database 
    collection = db.restaurant_indore
    cursor = collection.find({})
    
    # appending all the restaurant names inside this list
    for doc in cursor:
        restaurantNames.append(doc["showName"])
    restaurantNames.sort()    
  


except Exception as e:
    # print("Error -- Cannot connect to database")
    print(e)
    
class Form(FlaskForm):
    #the first dropdown 
    city = SelectField('city', choices=[('restaurant_indore', 'Indore'), ('restaurant_bhopal', 'Bhopal'), ('restaurant_pune', 'Pune'), ('restaurant_bangalore', 'Bangalore'), ('restaurant_mumbai', 'Mumbai'), ('restaurant_hyderabad', 'Hyderabad'), ('restaurant_delhi', 'Delhi'), ('restaurant_chennai', 'Chennai'), ('restaurant_noida', 'Noida'), ('restaurant_ahmedabad', 'Ahmedabad'), ('restaurant_ajmer', 'Ajmer'),('restaurant_chandigarh', 'Chandigarh'), ('restaurant_gurugram', 'Gurugram')])
    # second dropdown
    restaurant = SelectField('restaurant', choices = [])

# defining home route
@app.route("/", methods =['GET', 'POST'])
def home():
    form = Form()
    # form.city.choices = ['Indore', 'Bhopal', 'Pune', 'Chennai', 'Bengalore']
    # giving the starting restaurant names to the second dropdown i.e, indore restaurant names
    form.restaurant.choices = restaurantNames
    return render_template('index.html', form = form)

@app.route("/restaurant/<city>")
def restaurantByCityName(city):
    
    # getting the required collection based on user's choice of city     
    collection = db.get_collection(city)
    restaurants = []
    uniqueRestaurants=set()
    cursor = collection.find({})

    for doc in cursor:
        obj ={}
        obj["name"] = doc["showName"]
        obj["link"] = doc["link"]
        obj["id"] = str(doc["_id"])
        restaurants.append(obj)
        uniqueRestaurants.add(doc["showName"])
         
    # returning the required restaurant names as a set so that to update the second dropdown menu dynamically 
    return jsonify({'restaurants':sorted(uniqueRestaurants)})    


if __name__ == "__main__":
    app.run(debug=True, port = 8000)