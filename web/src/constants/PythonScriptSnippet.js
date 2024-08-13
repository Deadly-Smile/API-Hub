const PythonScriptSnippet = `###########################################################################
# Do not edit this part of the code
import tensorflow as tf
import sys
import numpy as np
###########################################################################

# Don't need to return anything, just print the result depending the result
def predict(image_path, model):
    # This is the sample code for cat-dog classification, you can edit from here
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    
    image = tf.keras.utils.load_img(
        image_path,
        color_mode="rgb",
        target_size=(64,64),
    )

    input_arr = tf.keras.utils.img_to_array(image)
    input_arr = np.array([input_arr])
    predictions = model.predict(input_arr)

    prediction = 'dog' if predictions[0][0] > 0.5 else 'cat'

    print(prediction)

###########################################################################
# Do not edit this part of the code
model_path = sys.argv[1]
image_path = sys.argv[2]

model = tf.keras.models.load_model(model_path)
predict(image_path, model)
###########################################################################
`;

const test = `###########################################################################
# Do not edit this part of the code
import sys
import json
###########################################################################
import tensorflow as tf
import numpy as np

tf.__version__


def my_function(a, b, c):
    # Your code here...
    result = {
        'a': a,
        'b': b,
        'c': c
    }
    return result


###########################################################################
# Do not edit this part of the code
if __name__ == "__main__":
    result = my_function('a', 'b', 'c')
    print(json.dumps(result))
###########################################################################
`;

export default PythonScriptSnippet;
