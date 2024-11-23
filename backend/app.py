

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
# presence_model = YOLOv10("D:\Semester 6\capstone\project\Cartease-CPG162\src\smodel_64eopch_32batch_1095.pt")
# recog_model = YOLOv10("D:\Semester 6\capstone\project\Cartease-CPG162\src\smodel_26epoch_8batch_102img_onlywafer.pt")

# # Virtual cart to store items
# virtual_cart = {}
# processed_objects = set()  # Keep track of processed objects by unique bounding box hashes
# @app.route("/process-image", methods=["POST"])
# def process_image():
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
#     confidence_array = presence_detections.confidence
#     class_ids_array = presence_detections.class_id
#     class_name_array = presence_detections.data.get("class_name", [])

#     items_detected = []

#     # Loop through all detections
#     for idx, bbox in enumerate(bbox_array):
#         x_min, y_min, x_max, y_max = map(int, bbox)
#         confidence = confidence_array[idx]
#         class_id = class_ids_array[idx]
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
#             item_class_id = item_detections.class_id[item_idx]
#             item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]
            

#             # Update the virtual cart
#             if class_name == "item_in":
#                 virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1
#             elif class_name == "item_out" and virtual_cart.get(item_name, 0) > 0:
#                 virtual_cart[item_name] -= 1

#             # Mark the bounding box as processed
#             processed_objects.add(bbox_hash)

#             # Log the detection
#             items_detected.append({
#                 "name": item_name,
#                 "action": class_name,
#                 "confidence": float(confidence)
#             })

#     return jsonify({"cart": virtual_cart, "detections": items_detected})

# # [ cart: { yellowwaferes: 3}, {unclechips: }]

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)


from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLOv10
import cv2
import numpy as np
import base64
import supervision as sv

app = Flask(__name__)
CORS(app)

# Load models
presence_model = YOLOv10("D:\Semester 6\capstone\project\Cartease-CPG162\src\smodel_64eopch_32batch_1095.pt")
recog_model = YOLOv10("D:\Semester 6\capstone\project\Cartease-CPG162\src\smodel_26epoch_8batch_102img_onlywafer.pt")

# Virtual cart to store items
virtual_cart = {}
processed_objects = set()  # Keep track of processed objects by unique bounding box hashes
camera_blocked = False  # Flag for blocked camera
no_cart_frames = 0  # Counter for frames without a "cart"
# FRAME_RATE = 30  # Assuming 30 frames per second
ALERT_THRESHOLD = 2  # 2 seconds worth of frames

@app.route("/process-image", methods=["POST"])
def process_image():
    global camera_blocked, no_cart_frames

    data = request.json
    if "image" not in data:
        return jsonify({"error": "No image data provided"}), 400

    # Decode the base64 image data
    image_data = base64.b64decode(data["image"])
    nparr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run the presence detection model
    presence_results = presence_model(frame)[0]
    presence_detections = sv.Detections.from_ultralytics(presence_results)

    # Extract detection information
    bbox_array = presence_detections.xyxy
    class_name_array = presence_detections.data.get("class_name", [])

    # Check if the "cart" is detected in the frame
    cart_detected = "cart" in class_name_array

    if cart_detected:
        no_cart_frames = 0  # Reset counter if "cart" is detected
        camera_blocked = False
    else:
        no_cart_frames += 1
        if no_cart_frames > ALERT_THRESHOLD:
            camera_blocked = True

    # Process detected objects
    items_detected = []
    for idx, bbox in enumerate(bbox_array):
        x_min, y_min, x_max, y_max = map(int, bbox)
        class_name = class_name_array[idx] if idx < len(class_name_array) else "unknown"

        # Create a unique identifier for the detected object
        bbox_hash = hash((x_min, y_min, x_max, y_max, class_name))

        # Skip already processed objects
        if bbox_hash in processed_objects:
            continue

        # Crop the region of interest
        cropped_frame = frame[y_min:y_max, x_min:x_max]

        # Run the recognition model on the cropped frame
        item_results = recog_model(cropped_frame)[0]
        item_detections = sv.Detections.from_ultralytics(item_results)

        for item_idx, item_bbox in enumerate(item_detections.xyxy):
            item_name = item_detections.data.get("class_name", ["unknown"])[item_idx]

            # Update the virtual cart
            if class_name == "item_in":
                virtual_cart[item_name] = virtual_cart.get(item_name, 0) + 1
            elif class_name == "item_out" and virtual_cart.get(item_name, 0) > 0:
                virtual_cart[item_name] -= 1

            # Mark the bounding box as processed
            processed_objects.add(bbox_hash)

            # Log the detection
            items_detected.append({
                "name": item_name,
                "action": class_name,
                "confidence": float(presence_detections.confidence[idx])
            })

    return jsonify({
        "cart": virtual_cart,
        "detections": items_detected,
        "camera_blocked": camera_blocked
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
