import pandas as pd
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

# Sample data (replace this with your own dataset)
data = {
    'customer_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    'product_id': [101, 102, 101, 103, 102, 104, 103, 105, 101, 105],
    'rating': [4, 5, 3, 4, 5, 3, 4, 2, 5, 1],
    'timestamp': ['2022-01-01 08:00:00', '2022-01-02 10:30:00', '2022-01-03 12:45:00', '2022-01-04 14:20:00', '2022-01-05 16:10:00', '2022-01-06 18:30:00', '2022-01-07 20:15:00', '2022-01-08 22:40:00', '2022-01-09 09:05:00', '2022-01-10 11:25:00'],
    'age': [25, 25, 32, 32, 28, 28, 40, 40, 22, 22],
    'gender': ['M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M'],
    'product_category': ['Clothing', 'Electronics', 'Clothing', 'Home Decor', 'Electronics', 'Home Decor', 'Home Decor', 'Beauty', 'Clothing', 'Beauty'],
}

df = pd.DataFrame(data)

# Label encoding for categorical features
le = LabelEncoder()
df['customer_id'] = le.fit_transform(df['customer_id'])
df['product_id'] = le.fit_transform(df['product_id'])
df['gender'] = le.fit_transform(df['gender'])
df['product_category'] = le.fit_transform(df['product_category'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(df[['customer_id', 'product_id', 'timestamp', 'age', 'gender', 'product_category']], df['rating'], test_size=0.2, random_state=42)

# Apply TruncatedSVD for matrix factorization
svd = TruncatedSVD(n_components=3, random_state=42)
X_train_svd = svd.fit_transform(X_train[['customer_id', 'product_id', 'timestamp', 'age', 'gender', 'product_category']])
X_test_svd = svd.transform(X_test[['customer_id', 'product_id', 'timestamp', 'age', 'gender', 'product_category']])

# Train a simple linear regression model
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train_svd, y_train)

# Make predictions on the test set
predictions = model.predict(X_test_svd)

# Evaluate the model
rmse = np.sqrt(mean_squared_error(y_test, predictions))
print(f"Root Mean Squared Error (RMSE): {rmse}")
