from flask import Flask, json, render_template, jsonify
from pymongo import  collection, cursor
from wtforms import SelectField
from flask_wtf import FlaskForm
import dns
import pymongo

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cairocoders-ednalan'

restaurantNames = []
cityNames = []
try:
    mongo = pymongo.MongoClient("mongodb+srv://kushal:kushal@restaurant-recommendati.p96gs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    mongo.server_info() #Triggers exception if can't connect to database
    # initializing the database
    db = mongo.restaurant
    # reffering to the first collection in the database 
    collection = db.restaurant_indore
    cursor = collection.find({})
    
    # appending all the restaurant names inside this list
    for doc in cursor:
        restaurantNames.append(doc["showName"])
  


except Exception as e:
    # print("Error -- Cannot connect to database")
    print(e)
    
class Form(FlaskForm):
    #the first dropdown 
    city = SelectField('city', choices=[('restaurant_indore', 'Indore'), ('restaurant_bhopal', 'Bhopal'), ('restaurant_pune', 'Pune'), ('restaurant_bengalore', 'Bengalore')])
    # second droppdown
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
    #Code for testing purposes
    if city == "restaurant_bengalore":
        return jsonify({'restaurants': [{'id': 2313, 'name': 'Restaurant 1', 'link': 'jsdhbjsa'}, {'id': 3434, 'name': 'Restaurant 2', 'link': 'dsadas'}]})

    # getting the required collection based on user's choice of city     
    collection = db.get_collection(city)
    restaurants = []
    cursor = collection.find({})

    for doc in cursor:
        obj ={}
        obj["name"] = doc["showName"]
        obj["link"] = doc["link"]
        obj["id"] = str(doc["_id"])
        restaurants.append(obj)
    # returning the required restaurant names as list of json objects so that to update the second dropdown menu dynamically 
    return jsonify({'restaurants':restaurants})    

if __name__ == "__main__":
    app.run(debug=True, port = 8000)