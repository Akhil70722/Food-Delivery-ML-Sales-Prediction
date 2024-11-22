import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from keras.models import load_model
import joblib

# Load the pre-trained LSTM model and scalers
lstm_model = load_model('lstm_model.h5')
scaler_X = joblib.load('scaler_X.pkl')
scaler_y = joblib.load('scaler_y.pkl')

# Flask app initialization
app = Flask(__name__)

# Function to preprocess the input data for LSTM
def preprocess_input(input_data):
    # Convert JSON to DataFrame
    input_df = pd.DataFrame([input_data])

    # One-hot encode input data to match training data columns
    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=scaler_X.feature_names_in_, fill_value=0)

    # Normalize the input data
    input_scaled = scaler_X.transform(input_df)

    # LSTM expects input data to be 3D: (samples, timesteps, features)
    # Reshape input data to 3D with 1 timestep if predicting on a single row of input
    input_scaled = np.expand_dims(input_scaled, axis=1)  # Shape: (samples, 1, features)

    return input_scaled

# Endpoint to handle prediction requests
@app.route('/predict', methods=['POST'])
def predict():
    # Retrieve JSON data from the frontend
    input_data = request.json

    # Preprocess the input data
    input_scaled = preprocess_input(input_data)

    # Make prediction
    prediction_scaled = lstm_model.predict(input_scaled)

    # Inverse transform the prediction to get original scale
    prediction = scaler_y.inverse_transform(prediction_scaled)

    # Return the prediction result as JSON
    return jsonify({'predicted_sales': round(prediction[0][0])})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
