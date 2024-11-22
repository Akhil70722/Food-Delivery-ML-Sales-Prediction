import pandas as pd
from flask import Flask, request, jsonify
import joblib

# Load the pre-trained Random Forest model and scalers
rf_model = joblib.load('random_forest_model.pkl')
scaler_X = joblib.load('scaler_X.pkl')
scaler_y = joblib.load('scaler_y.pkl')

# Flask app initialization
app = Flask(__name__)

# Endpoint to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    # Retrieve JSON data from the frontend
    input_data = request.json

    # Convert JSON to DataFrame
    input_df = pd.DataFrame([input_data])

    # One-hot encode input data to match training data columns
    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=scaler_X.feature_names_in_, fill_value=0)

    # Normalize the input data
    input_scaled = scaler_X.transform(input_df)

    # Make prediction
    prediction_scaled = rf_model.predict(input_scaled)
    prediction = scaler_y.inverse_transform(prediction_scaled.reshape(-1, 1))

    # Return the prediction result as JSON
    return jsonify({'predicted_sales': round(prediction[0][0])})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
