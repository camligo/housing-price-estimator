import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

data = pd.read_csv('data/melbourne_housing_data.csv')

features = ['Suburb', 'Rooms', 'Bathroom']
data = data.dropna(subset=features + ['Price'])

unique_suburbs = data['Suburb'].unique().tolist()

data = pd.get_dummies(data, columns=['Suburb'])

X = data[['Rooms', 'Bathroom'] + [col for col in data.columns if 'Suburb_' in col]]
y = data['Price']

columns_order = X.columns.tolist()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, 'model/model.pkl')
joblib.dump(unique_suburbs, 'model/suburbs.pkl')
joblib.dump(columns_order, 'model/columns.pkl')

print("Model trained and saved!")
