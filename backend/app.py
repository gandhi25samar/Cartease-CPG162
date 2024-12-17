
# #Logic 1
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from ultralytics import YOLOv10
# import cv2
# import numpy as np
# import base64
# import supervision as sv
# import random
# import time
# app = Flask(__name__)
# CORS(app)

# # Load models
# presence_model = YOLOv10("src/smodel_64eopch_32batch_1095.pt")
# recog_model = YOLOv10("src/smodel_64epoch_32batch_1116img_recog.pt")

# # Virtual cart to store items
# virtual_cart = {}
# processed_objects = set()  # Keep track of processed objects by unique bounding box hashes
# camera_blocked = False  # Flag for blocked camera
# no_cart_frames = 0  # Counter for frames without a "cart"
# # FRAME_RATE = 30  # Assuming 30 frames per second
# ALERT_THRESHOLD = 2  # 2 seconds worth of frames

# @app.route("/process-image", methods=["POST"])
# def process_image():

    
#     global camera_blocked, no_cart_frames

#     data = request.json
#     if "image" not in data:
#         return jsonify({"error": "No image data provided"}), 400

#     # Decode the base64 image data
#     image_data = base64.b64decode(data["image"])
#     nparr = np.frombuffer(image_data, np.uint8)
#     frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     # Run the presence detection model
#     presence_results = presence_model(frame)[0]
#     presence_detections = sv.Detections.from_ultralytics(presence_results)

#     # Extract detection information
#     bbox_array = presence_detections.xyxy
#     class_name_array = presence_detections.data.get("class_name", [])

#     # Check if the "cart" is detected in the frame
#     cart_detected = "cart" in class_name_array

#     if cart_detected:
#         no_cart_frames = 0  # Reset counter if "cart" is detected
#         camera_blocked = False
#     else:
#         no_cart_frames += 1
#         if no_cart_frames > ALERT_THRESHOLD:
#             camera_blocked = True

#     # Process detected objects
#     items_detected = []
#     for idx, bbox in enumerate(bbox_array):
#         x_min, y_min, x_max, y_max = map(int, bbox)
#         class_name = class_name_array[idx] if idx < len(class_name_array) else "unknown"

#         # Create a unique identifier for the detected object
#         bbox_hash = hash((x_min, y_min, x_max, y_max, class_name))

#         # Skip already processed objects
#         if bbox_hash in processed_objects:
#             continue

#         # Crop the region of interest
#         cropped_frame = frame[y_min:y_max, x_min:x_max]

#         # Run the recognition model on the cropped frame
#         item_results = recog_model(cropped_frame)[0]
#         item_detections = sv.Detections.from_ultralytics(item_results)

#         for item_idx, item_bbox in enumerate(item_detections.xyxy):
#             item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
#             if item_name == "lays_green_20":
#                 item_name = "Lays American Style Cream & Onion - 20"
#             elif item_name == "lays_green_50":
#                 item_name = "Lays American Style Cream & Onion - 50"

#             # Update the virtual cart
#             if class_name == "item_in":
#                 virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1
#             elif class_name == "item_out" and virtual_cart.get(item_name, 0) > 0:
#                 virtual_cart[item_name] -= 1
#                 if virtual_cart[item_name] == 0:
#                     del virtual_cart[item_name]



#             # Mark the bounding box as processed
#             processed_objects.add(bbox_hash)


#             # Log the detection
#             items_detected.append({
#                 "name": item_name,
#                 "action": class_name,
#                 "confidence": float(presence_detections.confidence[idx])
#             })
#     return jsonify({
#         "cart": virtual_cart,
#         "detections": items_detected,
#         "camera_blocked": False #camera_blocked
#     })

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000,debug=True)




# #     #Logic 2
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from ultralytics import YOLOv10
# import cv2
# import numpy as np
# import base64
# import supervision as sv
# import time
# from collections import deque

# app = Flask(__name__)
# CORS(app)

# # Load models
# presence_model = YOLOv10("src/smodel_64eopch_32batch_1095.pt")
# recog_model = YOLOv10("src/smodel_64epoch_32batch_1116img_recog.pt")

# # Virtual cart to store items
# virtual_cart = {}
# item_out_queue = deque()  # Queue for item-out actions
# no_cart_frames = 0  # Counter for frames without a "cart"
# ALERT_THRESHOLD = 2  # 2 seconds worth of frames

# @app.route("/process-image", methods=["POST"])
# def process_image():
#     global no_cart_frames, item_out_queue

#     data = request.json
#     if "image" not in data:
#         return jsonify({"error": "No image data provided"}), 400

#     # Decode the base64 image data
#     image_data = base64.b64decode(data["image"])
#     nparr = np.frombuffer(image_data, np.uint8)
#     frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     # Run the presence detection model
#     presence_results = presence_model(frame)[0]
#     presence_detections = sv.Detections.from_ultralytics(presence_results)

#     # Extract detection information
#     bbox_array = presence_detections.xyxy
#     class_name_array = presence_detections.data.get("class_name", [])
#     current_time = time.time()

#     # Track previous total quantity of items
#     prev_total_quantity = sum(virtual_cart.values())

#     items_detected = []
#     for idx, bbox in enumerate(bbox_array):
#         x_min, y_min, x_max, y_max = map(int, bbox)
#         class_name = class_name_array[idx] if idx < len(class_name_array) else "unknown"

#         # Crop the region of interest
#         cropped_frame = frame[y_min:y_max, x_min:x_max]

#         # Run the recognition model on the cropped frame
#         item_results = recog_model(cropped_frame)[0]
#         item_detections = sv.Detections.from_ultralytics(item_results)

#         for item_idx, item_bbox in enumerate(item_detections.xyxy):
#             item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
#             if item_name == "lays_green_20":
#                 item_name = "Lays American Style Cream & Onion - 20"
#             elif item_name == "lays_green_50":
#                 item_name = "Lays American Style Cream & Onion - 50"

#             if class_name == "item_out":
#                 # Add "item-out" event to the queue
#                 item_out_queue.append({"name": item_name, "timestamp": current_time})
#             elif class_name == "item_in":
#                 # Directly increase the quantity for "item-in"
#                 virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1

#             # Log the detection
#             items_detected.append({
#                 "name": item_name,
#                 "action": class_name,
#                 "confidence": float(presence_detections.confidence[idx])
#             })

#     # Calculate current total quantity
#     current_total_quantity = sum(virtual_cart.values())

#     # Handle item-out logic based on total quantity changes
#     if current_total_quantity > prev_total_quantity and item_out_queue:
#         # Quantity increased, item was put back in the cart
#         item_event = item_out_queue.popleft()
#         virtual_cart[item_event["name"]] = virtual_cart.get(item_event["name"], 0) + 1
#     elif current_total_quantity < prev_total_quantity and item_out_queue:
#         # Quantity decreased, item was removed from the cart
#         item_event = item_out_queue.popleft()
#         if item_event["name"] in virtual_cart and virtual_cart[item_event["name"]] > 0:
#             virtual_cart[item_event["name"]] -= 1
#             if virtual_cart[item_event["name"]] == 0:
#                 del virtual_cart[item_event["name"]]

#     # Clean up old item-out events
#     time_decay = 5  # Time in seconds before stale entries are removed
#     while item_out_queue and current_time - item_out_queue[0]["timestamp"] > time_decay:
#         item_out_queue.popleft()

#     return jsonify({
#         "cart": virtual_cart,
#         "detections": items_detected,
#         "camera_blocked": no_cart_frames > ALERT_THRESHOLD
#     })

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)









# # # #Logic 3
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from ultralytics import YOLOv10
# # import cv2
# # import numpy as np
# # import base64
# # import supervision as sv
# # import time

# app = Flask(__name__)
# CORS(app)

# # Load models
# presence_model = YOLOv10("src/smodel_64eopch_32batch_1095.pt")
# recog_model = YOLOv10("src/smodel_26epoch_8batch_102img_onlywafer.pt")

# # Virtual cart to store items
# virtual_cart = {}
# processed_objects = {}  # Store processed objects with timestamps
# movement_threshold = 10  # Minimum pixel movement to consider an object moved
# time_decay = 5  # Time in seconds before reprocessing an item
# no_cart_frames = 0
# ALERT_THRESHOLD = 2  # Number of seconds without detecting "cart"
# @app.route("/process-image", methods=["POST"])
# def process_image():
#     global processed_objects  # Declare as global
#     global no_cart_frames

#     data = request.json
#     if "image" not in data:
#         return jsonify({"error": "No image data provided"}), 400

#     # Decode the base64 image data
#     image_data = base64.b64decode(data["image"])
#     nparr = np.frombuffer(image_data, np.uint8)
#     frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     # Run the presence detection model
#     presence_results = presence_model(frame)[0]
#     presence_detections = sv.Detections.from_ultralytics(presence_results)

#     # Extract detection information
#     bbox_array = presence_detections.xyxy
#     class_name_array = presence_detections.data.get("class_name", [])
#     current_time = time.time()

#     # Clean up old entries in processed_objects
#     processed_objects = {k: v for k, v in processed_objects.items() if current_time - v["timestamp"] <= time_decay}

#     # Check if the "cart" is detected
#     cart_detected = "cart" in class_name_array
#     if cart_detected:
#         no_cart_frames = 0
#     else:
#         no_cart_frames += 1
#         if no_cart_frames > ALERT_THRESHOLD:
#             return jsonify({"error": "Cart not detected", "cart": virtual_cart}), 400

#     # Process detected objects
#     items_detected = []
#     for idx, bbox in enumerate(bbox_array):
#         x_min, y_min, x_max, y_max = map(int, bbox)
#         class_name = class_name_array[idx] if idx < len(class_name_array) else "unknown"

#         # Create a unique identifier for the detected object
#         bbox_hash = hash((x_min, y_min, x_max, y_max, class_name))

#         # Check movement threshold
#         if bbox_hash in processed_objects:
#             prev_bbox = processed_objects[bbox_hash]["bbox"]
#             if all(abs(prev_bbox[i] - bbox[i]) <= movement_threshold for i in range(4)):
#                 continue  # Skip processing if the object hasn't moved significantly

#         # Update processed_objects
#         processed_objects[bbox_hash] = {"bbox": bbox, "timestamp": current_time}

#         # Crop the region of interest
#         cropped_frame = frame[y_min:y_max, x_min:x_max]

#         # Run the recognition model on the cropped frame
#         item_results = recog_model(cropped_frame)[0]
#         item_detections = sv.Detections.from_ultralytics(item_results)

#         for item_idx, item_bbox in enumerate(item_detections.xyxy):
#             item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
#             if item_name == "yellow_wafers":
#                 item_name = "Nabati Cheese Wafers"

#             # Update the virtual cart
#             if class_name == "item_in":
#                 virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1
#             elif class_name == "item_out" and virtual_cart.get(item_name, 0) > 0:
#                 virtual_cart[item_name] -= 1
#                 if virtual_cart[item_name] == 0:
#                     del virtual_cart[item_name]

#             # Log the detection
#             items_detected.append({
#                 "name": item_name,
#                 "action": class_name,
#                 "confidence": float(presence_detections.confidence[idx])
#             })

#     return jsonify({
#         "cart": virtual_cart,
#         "detections": items_detected
#     })


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)







#Logic 4
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from ultralytics import YOLOv10
# import cv2
# import numpy as np
# import base64
# import supervision as sv

# app = Flask(__name__)
# CORS(app)

# # Load models
# presence_model = YOLOv10("src/smodel_64eopch_32batch_1095.pt")
# recog_model = YOLOv10("src/smodel_64epoch_32batch_1116img_recog.pt")

# # Virtual cart to store items
# virtual_cart = {}

# @app.route("/process-image", methods=["POST"])
# def process_image():
#     global virtual_cart

#     data = request.json
#     if "image" not in data:
#         return jsonify({"error": "No image data provided"}), 400

#     # Decode the base64 image data
#     image_data = base64.b64decode(data["image"])
#     nparr = np.frombuffer(image_data, np.uint8)
#     frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#     # Run the presence detection model
#     presence_results = presence_model(frame)[0]
#     presence_detections = sv.Detections.from_ultralytics(presence_results)

#     # Reset the virtual cart
#     virtual_cart = {}

#     # Process detected objects
#     items_detected = []
#     for idx, bbox in enumerate(presence_detections.xyxy):
#         x_min, y_min, x_max, y_max = map(int, bbox)
#         class_name = presence_detections.data.get("class_name", [])[idx] if idx < len(presence_detections.data.get("class_name", [])) else "unknown"

#         # Focus only on "item-in"
#         if class_name == "item_in":
#             # Crop the region of interest
#             cropped_frame = frame[y_min:y_max, x_min:x_max]

#             # Run the recognition model on the cropped frame
#             item_results = recog_model(cropped_frame)[0]
#             item_detections = sv.Detections.from_ultralytics(item_results)

#             for item_idx, item_bbox in enumerate(item_detections.xyxy):
#                 item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
#                 if item_name == "lays_green_20":
#                     item_name = "Lays American Style Cream & Onion - 20"
#                 elif item_name == "lays_green_50":
#                     item_name = "Lays American Style Cream & Onion - 50"

#                 # Update the virtual cart
#                 virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1

#                 # Log the detection
#                 items_detected.append({
#                     "name": item_name,
#                     "action": class_name,
#                     "confidence": float(presence_detections.confidence[idx])
#                 })

#     return jsonify({
#         "cart": virtual_cart,
#         "detections": items_detected
#     })


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)



#Logic 5
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLOv10
import supervision as sv
import os
import base64

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load models
presence_model = YOLOv10("src/smodel_64eopch_32batch_1095.pt")
recog_model = YOLOv10("src/smodel_64epoch_32batch_1116img_recog.pt")

no_cart_frames = 0  # Counter for frames without a "cart"
ALERT_THRESHOLD = 2  # 2 seconds worth of frames

@app.route("/process-image", methods=["POST"])
def process_image():
    global no_cart_frames
    # Reset the virtual cart for each request
    virtual_cart = {}

    # Parse the incoming request data
    data = request.json
    if "image" not in data:
        return jsonify({"error": "No image data provided"}), 400

    # Decode the base64 image data
    image_data = base64.b64decode(data["image"])
    nparr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if frame is None:
        return jsonify({"error": "Failed to decode image data"}), 400

    # Run the presence detection model
    presence_results = presence_model(frame)[0]
    presence_detections = sv.Detections.from_ultralytics(presence_results)

    # Annotate the frame with presence model detections
    # presence_annotator = sv.BoxAnnotator()
    # label_annotator = sv.LabelAnnotator()
    # presence_annotated_frame = presence_annotator.annotate(frame.copy(), presence_detections)
    # presence_annotated_frame = label_annotator.annotate(
    #     scene=presence_annotated_frame, detections=presence_detections
    # )

    # Process detected objects: Only process the largest bounding box
    items_detected = []
    bbox_array = presence_detections.xyxy
    class_name_array = presence_detections.data.get("class_name", [])
    cart_detected = "cart" in class_name_array

    if cart_detected:
        no_cart_frames = 0
    else:
        no_cart_frames+= 1
        if no_cart_frames > ALERT_THRESHOLD:
            camera_blocked = True
    if len(bbox_array) > 0:
        areas = [(bbox[2] - bbox[0]) * (bbox[3] - bbox[1]) for bbox in bbox_array]
        largest_idx = np.argmax(areas)
        largest_bbox = bbox_array[largest_idx]
        x_min, y_min, x_max, y_max = map(int, largest_bbox)

        class_name = presence_detections.data.get("class_name", [])[largest_idx] \
            if largest_idx < len(presence_detections.data.get("class_name", [])) else "unknown"

        cropped_frame = frame[y_min:y_max - 25, x_min + 225:x_max - 225]

        # Run the recognition model on the cropped frame
        item_results = recog_model(cropped_frame)[0]
        item_detections = sv.Detections.from_ultralytics(item_results)

        # Annotate the cropped frame with recognition model detections
        # recog_annotator = sv.BoxAnnotator()
        # recog_annotated_frame = recog_annotator.annotate(
        #     cropped_frame.copy(), item_detections
        # )
        # recog_annotated_frame = label_annotator.annotate(
        #     scene=recog_annotated_frame, detections=item_detections
        # )

        for item_idx, item_bbox in enumerate(item_detections.xyxy):
            item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
            if item_name == "lays_green_20":
                item_name = "Lays American Style Cream & Onion - 20"
            elif item_name == "lays_green_50":
                item_name = "Lays American Style Cream & Onion - 50"

            # Update the virtual cart
            virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1

            # Log the detection
            items_detected.append({
                "name": item_name,
                "action": class_name,
                "confidence": float(presence_detections.confidence[largest_idx])
            })

    # # Save the annotated frame
    # output_path = os.path.join(output_folder, "annotated_image.jpg")
    # cv2.imwrite(output_path, presence_annotated_frame)

    # Return the response
    return jsonify({
        "cart": virtual_cart,
        "detections": items_detected,
        "camera_blocked": camera_blocked
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)




# # FOR HARD CODED TESTING 
# # products = [
# #     "Uncle Chips Spicy Treat",
# #     "Lays American Style Cream & Onion - 50",
# #     "Lays American Style Cream & Onion - 20",
# #     "Tata Premium Tea",
# #     "Tetley Green Tea",
# #     "Nabati Cheese Wafers"
# # ]

# # virtual_cart = {product: random.randint(0, 10) for product in products}
# #     virtual_cart = {k: v for k, v in virtual_cart.items() if v > 0}