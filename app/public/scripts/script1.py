import tensorflow as tf
import sys
import json
import numpy as np
import os

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Getting arguments
model_path = sys.argv[1]
image_path = sys.argv[2]

model = tf.keras.models.load_model(model_path)

# Read input data from the command line
image = tf.keras.utils.load_img(
    image_path,
    color_mode="rgb",
    target_size=(64,64),
    # interpolation="nearest",
    # keep_aspect_ratio=False,
)

# Preprocess the input data as required by your model (example here assumes input is in a suitable format)
image = tf.keras.utils.load_img(
    image_path,
    color_mode="rgb",
    target_size=(64,64),
    # interpolation="nearest",
    # keep_aspect_ratio=False,
)

# Preprocess the input data as required by your model (example here assumes input is in a suitable format)
input_arr = tf.keras.utils.img_to_array(image)
input_arr = np.array([input_arr])  # Convert single image to a batch.
predictions = model.predict(input_arr)

prediction = 'dog' if predictions[0][0] > 0.5 else 'cat'

output = json.dumps({"prediction": prediction})
print(output)
# print(json.dumps(prediction))
