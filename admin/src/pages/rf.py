import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load the data
data = pd.read_csv("Food_data.csv")

# Convert 'date' column to datetime format and extract month and year
data['date'] = pd.to_datetime(data['date'], format='%m/%d/%Y')
data['Month'] = data['date'].dt.month
data['Year'] = data['date'].dt.year
data = data.drop('date', axis=1)

# Prepare X and y
y = data['unit_sold'].values
X = data.drop('unit_sold', axis=1)

# Encode categorical variables
X = pd.get_dummies(X, drop_first=True)

# Normalize the data (Optional, not strictly necessary for Random Forest)
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

X_scaled = scaler_X.fit_transform(X)
y_scaled = scaler_y.fit_transform(y.reshape(-1, 1))

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_scaled, test_size=0.2, random_state=42)

# Train the Random Forest model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train.ravel())

# Save the trained model and scalers
joblib.dump(rf_model, 'random_forest_model.pkl')
joblib.dump(scaler_X, 'scaler_X.pkl')
joblib.dump(scaler_y, 'scaler_y.pkl')

# Print training completion message
print("Random Forest model and scalers saved successfully.")
