# backend/face_detector.py
import sys
import base64
from io import BytesIO
from PIL import Image
import cv2
import numpy as np

def detect_face_opencv_haar(base64_image_stdin):
    try:
        base64_string = base64_image_stdin.strip()
        image_data = base64.b64decode(base64_string.split(',')[1])
        image_pil = Image.open(BytesIO(image_data)).convert('RGB')
        image_np = np.array(image_pil)
        gray_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

        # Load Haar Cascade Classifier (ensure path is correct)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        if face_cascade.empty():
            raise Exception("Error loading face cascade classifier. Ensure 'haarcascade_frontalface_default.xml' is in the correct OpenCV data directory.")

        faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) > 0:
            return True  # Face detected
        else:
            return False # No face detected

    except Exception as e:
        print(f"Error during face detection: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    base64_image_stdin = sys.stdin.read()
    face_detected = detect_face_opencv_haar(base64_image_stdin)
    if face_detected:
        print("face_detected")
    else:
        print("no_face_detected")