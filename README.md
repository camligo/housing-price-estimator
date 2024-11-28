# Changelog

## 14/11/2024
- Intial setup of backend with Python (Flask)
- Loaded Melbourne housing dataset and explored the data using pandas
- Implemented a Linear Regression model to predict house prices based on suburb, number of rooms, and bathrooms

## 25/11/2024
- Initialized the frontend project with React and TypeScript
- Created a form component to input house details
- Connected the form to the Flask backend via a POST /predict API request
- Modified paths in app.py to absolute paths

## 28/11/2024
- Created a /suburbs route in Flask to get a list of suburbs from the backend
- Updated form to fetch and display suburbs in a dropdown menu
- Added error messages in the form for cases like missing input fields or failed API requests
- Updated the Flask backend to handle missing or invalid suburb inputs
