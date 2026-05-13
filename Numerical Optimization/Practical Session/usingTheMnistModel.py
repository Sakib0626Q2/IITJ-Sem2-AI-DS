import keras
import numpy as np
from PIL import Image

# Load
model = keras.models.load_model('/home/md-sakib/Desktop/IITJ-Sem2-AI-DS/Numerical Optimization/Practical Session/mnist_model.keras')

# Prepare your input (example: a 28x28 image file)
img = Image.open('/home/md-sakib/Desktop/IITJ-Sem2-AI-DS/Numerical Optimization/Practical Session/digit1.png').convert('L')  # grayscale
img = img.resize((28, 28))
img_array = np.array(img) / 255.0               # normalize
img_array = img_array.reshape(-1, 784)            # flatten, add batch dim

# Predict
prediction = model.predict(img_array)
predicted_digit = np.argmax(prediction)
print(predicted_digit)