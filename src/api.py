from flask import Flask, request
import re
import json
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

# CONSTANTS
BYTES = 1
KILOBYTE = BYTES * 1024
MEGABYTE = KILOBYTE * 1024
GIGABYTE = MEGABYTE * 1024


@app.route('/salary')
def sal_to_bytes():
    salary = request.args.get('num', '')
    if re.search(r'^\d+$', salary) is None:
        return json.dumps('Salary ain\'t given in text!')

    salary = int(salary)
    if salary < 100000000000:
        # byte = str(salary) + ' B'
        kilo_byte = str(float(salary / KILOBYTE)) + ' KB'
        mega_byte = str(float(salary / MEGABYTE)) + ' MB'
        # giga_byte = str(float(salary / GIGABYTE)) + ' GB'
        return_dict = [
            {
                'KB': kilo_byte,
                'MB': mega_byte,
            }
        ]
        return json.dumps(return_dict)
    else:
        return json.dumps('You know that\'s too much for you!')


app.run()
