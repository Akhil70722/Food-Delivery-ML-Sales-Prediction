import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import r2_score, mean_squared_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load the data
data = pd.read_csv("Food_data.csv")

# Convert 'date' column to datetime format and extract month and year
data['date'] = pd.to_datetime(data['date'], format='%m/%d/%Y')
data['Month'] = data['date'].dt.month
data['Year'] = data['date'].dt.year
data = data.drop('date', axis=1)

# Separate target variable
y = data['unit_sold'].values
X = data.drop('unit_sold', axis=1)

# Encode categorical variables
X = pd.get_dummies(X, drop_first=True)

# Normalize data
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

X_scaled = scaler_X.fit_transform(X)
y_scaled = scaler_y.fit_transform(y.reshape(-1, 1))

# Reshape X for LSTM (samples, timesteps, features)
X_lstm = X_scaled.reshape(X_scaled.shape[0], 1, X_scaled.shape[1])

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X_lstm, y_scaled, test_size=0.2, random_state=42)

# Build the LSTM model
model = Sequential([
    LSTM(50, activation='relu', input_shape=(X_train.shape[1], X_train.shape[2])),
    Dense(1)
])

# Compile the model
model.compile(optimizer='adam', loss='mse')

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), verbose=1)

# Evaluate the model
y_pred_scaled = model.predict(X_test)
y_pred = scaler_y.inverse_transform(y_pred_scaled)
y_test_actual = scaler_y.inverse_transform(y_test)

# Calculate metrics
r2 = r2_score(y_test_actual, y_pred)
mse = mean_squared_error(y_test_actual, y_pred)

print(f"R² Score: {r2}")
print(f"Mean Squared Error: {mse}")

# Prediction function using LSTM
def predict_unit_sold_lstm():
    # Collect user input for each feature
    input_data = {
        "Month": int(input("Enter month (1-12): ")),
        "Year": int(input("Enter year (e.g., 2023): ")),
        "total_sales": float(input("Enter total sales amount: ")),
        "price": float(input("Enter price per unit: ")),
        "cost": float(input("Enter cost per unit: "))
    }

    # Collect categorical inputs and encode as dummy variables
    input_data["canteen"] = input("Enter canteen name: ")
    input_data["product_id"] = input("Enter product ID: ")
    input_data["weather"] = input("Enter weather condition (e.g., Sunny, Rainy): ")
    input_data["season"] = input("Enter season (e.g., Winter, Summer): ")
    input_data["academic_calendar"] = input("Enter academic calendar (e.g., Exam, Holiday): ")
    input_data["time_of_sale"] = input("Enter time of sale (e.g., Morning, Afternoon): ")
    input_data["product_name"] = input("Enter product name: ")

    # Create a DataFrame with one row from the input data
    input_df = pd.DataFrame([input_data])

    # One-hot encode input data to match training data columns
    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=X.columns, fill_value=0)

    # Normalize and reshape input for LSTM
    input_scaled = scaler_X.transform(input_df)
    input_lstm = input_scaled.reshape(1, 1, input_scaled.shape[1])

    # Make prediction
    prediction_scaled = model.predict(input_lstm)
    prediction = scaler_y.inverse_transform(prediction_scaled)

    print(f"Predicted units sold: {round(prediction[0][0])}")

# Call the function to get a prediction based on user input
predict_unit_sold_lstm()