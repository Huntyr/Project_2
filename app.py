import psycopg2
from flask import Flask
import json

# Flask Setup
app = Flask(__name__)

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

#xecute query
cursor1.execute("select location, min, max, mean from aggregate_data")

rows1 = cursor1.fetchall()
for r1 in rows1:
    print (f"location {r1[0]} min {r1[1]} max {r1[2]} mean {r1[3]}")

# close the cursor
cursor1.close()

#close the connection
con.close()

################# Parse the geojson data ###################
file = './data/oregon-washignton-counties-geojson.json'

with open(file, encoding='utf-8-sig') as json_file:

    json_data = json.load(json_file)
    print(json_data)


################# Flask Routes ###################
@app.route('/')
def index():
    return "<h1 style='color: red'>hello flask</h1>"


if __name__ == "__main__":
    app.run()