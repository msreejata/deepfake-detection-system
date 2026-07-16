# deepfake-detection-system
# 🛡️ Deepfake Detection System

A web-based Deepfake Detection System that uses a fine-tuned EfficientNet-B4 deep learning model to classify uploaded facial images as **Real** or **Fake**. The application consists of a React (Vite) frontend and a FastAPI backend that performs inference using a PyTorch model.

---

## 📌 Features

- Upload an image for deepfake detection
- AI-powered prediction using EfficientNet-B4
- Displays prediction label (Real/Fake)
- Shows confidence score
- Fast inference using PyTorch
- REST API built with FastAPI
- Responsive React frontend
- CORS-enabled backend for seamless frontend communication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- FastAPI
- Uvicorn
- PyTorch
- Torchvision
- timm
- Pillow

### Deep Learning
- EfficientNet-B4
- Transfer Learning
- Image Classification

---

## 📁 Project Structure

```
DeepFake-Detection-Model/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── model/
│   │   └── best_efficientnet_b4.pth
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/your-username/DeepFake-Detection-System.git

cd DeepFake-Detection-System
```

---

# 🖥️ Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment (recommended).

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Make sure the trained model is placed here:

```
backend/
└── model/
    └── best_efficientnet_b4.pth
```

Run the FastAPI server.

```bash
uvicorn main:app --reload
```

The backend will start on

```
http://127.0.0.1:8000
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

---

# 🌐 Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```
VITE_API_URL=http://127.0.0.1:8000
```

Run the development server.

```bash
npm run dev
```

The frontend will be available at

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Health Check

**GET /**

Returns server status.

### Response

```json
{
  "status": "ok"
}
```

---

## Predict Image

**POST /predict**

### Request

Multipart form-data

```
file : image
```

Supported formats include:

- JPG
- JPEG
- PNG

### Response

```json
{
  "label": "fake",
  "confidence": 0.9834
}
```

or

```json
{
  "label": "real",
  "confidence": 0.9472
}
```

---

# 🧠 Model Details

Model Architecture:

- EfficientNet-B4

Framework:

- PyTorch

Input Size:

```
380 × 380
```

Normalization:

```
Mean:
[0.485, 0.456, 0.406]

Std:
[0.229, 0.224, 0.225]
```

Prediction:

The model outputs probabilities for two classes:

- Real
- Fake

Softmax is applied to obtain prediction confidence.

---

# 📦 Backend Dependencies

```
fastapi
uvicorn[standard]
python-multipart
pillow
torch
torchvision
timm
```

Install with

```bash
pip install -r requirements.txt
```

---

# 🚀 Running the Complete Project

### Terminal 1

```bash
cd backend

uvicorn main:app --reload
```

### Terminal 2

```bash
cd frontend

npm install
npm run dev
```

Open

```
http://localhost:5173
```

Upload an image and receive the prediction from the FastAPI backend.

---

# 🔍 Workflow

```
User uploads image
        │
        ▼
React Frontend
        │
POST /predict
        │
        ▼
FastAPI Backend
        │
Image Preprocessing
        │
EfficientNet-B4 Model
        │
Prediction
        │
Confidence Score
        │
        ▼
Frontend Displays Result
```

---

# 📷 Screenshots

You can add screenshots of:

- Home Page
- Image Upload
- Prediction Result
- FastAPI Swagger Documentation

---

# 🔮 Future Enhancements

- Video deepfake detection
- Batch image prediction
- Heatmap visualization (Grad-CAM)
- User authentication
- Prediction history
- Cloud deployment
- Mobile-responsive UI improvements
- Support for multiple deepfake models

---

# 👥 Contributors

- **Prabrisha Sarkar**
- **MD Shahid**
- **Sreejata**

---

# 📄 License

This project is developed for educational and academic purposes.

Feel free to modify and extend it for research and learning.

---

# 🙏 Acknowledgements

- PyTorch
- FastAPI
- React
- Vite
- EfficientNet
- timm
