import os
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, 'model', 'model.pkl'))
suburbs = joblib.load(os.path.join(BASE_DIR, 'model', 'suburbs.pkl'))
columns_order = joblib.load(os.path.join(BASE_DIR, 'model', 'columns.pkl'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    suburb = data['suburb']
    rooms = data['rooms']
    bathroom = data['bathroom']

    # suburb is encoded with 'Suburb_' prefix
    suburb_encoded = [1 if f'Suburb_{s}' == f'Suburb_{suburb}' else 0 for s in suburbs]

    # prepare input data for the model
    input_data = pd.DataFrame([[rooms, bathroom] + suburb_encoded],
        columns=['Rooms', 'Bathroom'] + [f'Suburb_{s}' for s in suburbs])

    input_data = input_data.reindex(columns=columns_order, fill_value=0)

    prediction = model.predict(input_data)[0]
    return jsonify({'predicted_price': prediction})

if __name__ == '__main__':
    app.run(debug=True)
