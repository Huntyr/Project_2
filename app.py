import psycopg2
import csv
from flask import Flask
from flask import jsonify
from flask import request
from flask import send_from_directory
import json

# Flask Setup
app = Flask(__name__, static_url_path='')

# connect to the low_birth_weight database
con = psycopg2.connect(
    host = "127.0.0.1",
    database = "low_birth_weight",
    user = "postgres",
    password = "postgres",
    port="5432"
)

################# Load Birth data Table ###################
#create cursor
cursor = con.cursor()
#xecute query
cursor.execute("select location, year, percentage_of_babies from birth_data")
rows = cursor.fetchall()
for r in rows:
   print (f"location {r[0]} year {r[1]} percentage_of_babies {r[2]} ")
# close the cursor
cursor.close()

################# Load Aggregate Table ###################
#create new cursor
cursor1 = con.cursor()
#execute query
# cursor1.execute("select location, Min, Max, Mean, ArrayPlus, ArrayMinus from aggregate_data")
cursor1.execute("select * from aggregate_data")
rows1 = cursor1.fetchall()

print (rows1)

for r1 in rows1:
   print (f"location {r1[0]} Min {r1[1]} Max {r1[2]} Mean {r1[3]} ArrayPlus {r1[4]} ArrayMinus {r1[5]}")

# close the cursor
cursor1.close()
#close the connection
con.close()

# create a dictionary from the row data and append to birth_weight_db / aggregate_db
def bw_to_json():
    birth_weight_db = []
    for location, year, percentage_of_babies in rows:
        birth_weight_dict = {}
        birth_weight_dict["location"] = location
        birth_weight_dict["year"] = year
        birth_weight_dict["percentage_of_babies"] = percentage_of_babies
        birth_weight_db.append(birth_weight_dict)
    return jsonify(birth_weight_db)

def bw1_to_json():
    aggregate_db = []
    for location, Min, Max, Mean, ArrayPlus, ArrayMinus in rows1:
        aggregate_dict = {}
        aggregate_dict["location"] = location
        aggregate_dict["Min"] = Min
        aggregate_dict["Max"] = Max
        aggregate_dict["Mean"] = Mean
        aggregate_dict["ArrayPlus"] = ArrayPlus
        aggregate_dict["ArrayMinu"] = ArrayMinus
        aggregate_db.append(aggregate_dict)
    return jsonify(aggregate_db)  
################# Parse the geojson data ###################
file = './data/oregon-washignton-counties-geojson.json'

with open(file, encoding='utf-8-sig') as json_file:

    json_data = json.load(json_file)
    # print(json_data)


################# Flask Routes ###################
@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/choropleth')
def choropleth():
    return app.send_static_file('choropleth.html')

@app.route('/linechart')
def line():
    return app.send_static_file('linechart.html')

@app.route('/errorbar')
def bar():
    return app.send_static_file('errorbar.html')

@app.route('/API/CountyGeoJSON')
def geoJSON():
    return jsonify(json_data)

# @app.route('/API/BW')
# def BW():
#     return csv2json(rows)

@app.route('/API/BW')
def BW():
	return bw_to_json()

@app.route('/API/AGG')
def AGG():
    return bw1_to_json()



if __name__ == "__main__":
    app.run(debug=True)