import flask
from flask import request, render_template
import pickle
import pandas as pd
import pathlib

# app = flask.Flask(__name__,template_folder="templates")
abspathCosine = pathlib.Path("restaurant_recommender/files/cosine_sim_gurugram.pickle").absolute()
abspathIndices = pathlib.Path("restaurant_recommender/files/indices_gurugram.csv").absolute()

with open(abspathCosine, 'rb') as f:
    cosine_sim = pickle.load(f)


# with open('indices_gurugram.csv', 'rb') as f:
#    indices = pickle.load(f)

def get_recommendation_gurugram(title):
    recommended_restaurant = []  
    indices = pd.read_csv(abspathIndices)
    indices = indices["name"]
    with open(abspathCosine, 'rb') as f:

        cosine_sim = pickle.load(f)
    # restaurant match indices
    idx = indices[indices == title].index[0]
    # similarity scores
    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
    # top n
    top_n_indexes = list(score_series.iloc[1:11].index)
    for i in top_n_indexes:
        recommended_restaurant.append(list(indices)[i])
     #df = pd.DataFrame(recommended_restaurant)   
    return recommended_restaurant


# Set up the main route , methods=['GET', 'POST']
# @app.route('/predict', methods=['GET', 'POST'])
# def main():

    
#     if request.method == 'GET':
#         return(flask.send_file('templates/index.html'))
            
#     if request.method == 'POST':
#         try:
#             m_name = request.form['r_name']
#             m_name =" "+m_name
#             result_final = get_recommendations(m_name)
#             names = []
#             for i in range(len(result_final)):
#                 names.append(result_final[i])

#             return render_template('positive.html',r_names=names,search_name=m_name)
#         except:
            
#             return render_template("negative.html",name=m_name)
 
  
 

# if __name__=="__main__":
#     app.run(debug=True)