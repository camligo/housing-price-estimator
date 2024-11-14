import pandas as pd

data = pd.read_csv('melbourne_housing_data.csv')

print("First 10 rows:")
print(data.head(50))

print("\nDataset information:")
print(data.info())
