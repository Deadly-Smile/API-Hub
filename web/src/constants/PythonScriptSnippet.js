const PythonScriptSnippet = `
### This is the place where you write the script for will print result based in the input image
# the script and model will be tested on the example image
### Note: Only print the result for the image, do not print additional text

# Do not edit this part of the code
import tensorflow as tf
import sys
import json
import numpy as np
import os

model_path = sys.argv[1]
image_path = sys.argv[2]

model = tf.keras.models.load_model(model_path)


# Don't need to return anything, just print the result depending the result
def predict(image_path, model):
    # This is the sample code for cat-dog classification, you can edit from here
    # image = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    # image = tf.keras.utils.load_img(
    #     image_path,
    #     color_mode="rgb",
    #     target_size=(64,64),
    # )

    # image = tf.keras.utils.load_img(
    #     image_path,
    #     color_mode="rgb",
    #     target_size=(64,64),
    # )

    # input_arr = tf.keras.utils.img_to_array(image)
    # input_arr = np.array([input_arr])  # Convert single image to a batch.
    # predictions = model.predict(input_arr)

    # prediction = 'dog' if predictions[0][0] > 0.5 else 'cat'

    # output = json.dumps({"prediction": prediction})
    # print(output)

predict(image_path, model)
`;

export default PythonScriptSnippet;
