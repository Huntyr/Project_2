import psycopg2
from flask import Flask,render_template
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

#execute query
# cursor1.execute("select location, Min, Max, Mean, ArrayPlus, ArrayMinus from aggregate_data")
cursor1.execute("select * from aggregate_data")

rows1 = cursor1.fetchall()
for r1 in rows1:
    print (f"location {r1[0]} Min {r1[1]} Max {r1[2]} Mean {r1[3]} ArrayPlus {r1[4]} ArrayMinus {r1[5]}")

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
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)