# 🛡️ Deepfake Detection System

A face-swap deepfake detection system built as a B.Tech final year project that benchmarks three deep learning architectures on a custom 19,990-image dataset derived from DF40 and FaceForensics++, and deploys the best-performing model (EfficientNet-B4) as a live web application.

**Live App:** https://deepfake-detection-system-peach.vercel.app/

---

## 📌 Features

- Upload a facial image and receive a Real/Fake prediction with a confidence score
- Inference powered by a fine-tuned EfficientNet-B4 model (PyTorch)
- REST API built with FastAPI
- Responsive React frontend
- CORS-enabled backend for cross-origin frontend communication

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite (build tool/dev server)
- Deployed on Vercel

### Backend
- FastAPI (Python)
- Uvicorn (ASGI server)
- python-multipart (form/file upload handling)
- Deployed on Render

### Machine Learning / Inference
- PyTorch
- `timm` (EfficientNet-B4 architecture)
- Pillow (image preprocessing)
- Input resolution: 380×380
- Normalization: ImageNet stats (mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225])

### Model Training & Benchmarking (research pipeline, run on Kaggle GPU notebooks)
- **EfficientNet-B4** — PyTorch + `timm`, AdamW optimizer, CosineAnnealingLR scheduler, Cross-Entropy loss, staged fine-tuning (freeze → unfreeze)
- **Xception** — PyTorch + `timm`, Adam optimizer, Binary Cross-Entropy loss
- **CLIP (ViT-L/14)** — `open_clip_torch`, linear probe: frozen backbone feature extraction + scikit-learn `LogisticRegression` classifier head
- pandas (manifest-driven dataset pipeline), scikit-learn (metrics, CLIP classifier)

### Dataset
- 19,990 images: 10,000 real (FaceForensics++) + 9,990 fake (DF40, 9 face-swap methods: FSGAN, FaceSwap, SimSwap, InSwapper, BlendFace, UniFace, MobileFaceSwap, e4s, FaceDancer)
- Video-level 60/10/30 train/val/test split to prevent identity leakage
- `manifest.csv`-driven pipeline (filepath, label, method, video_id, split)

---

## 📁 Project Structure

```
DeepFake-Detection-Model/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── .env
│
├── backend/
│   ├── model/
│   │   └── best_efficientnet_b4.pth
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore
```

---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/msreejata/deepfake-detection-system.git
cd deepfake-detection-system/DeepFake-Detection-Model-main
```

### 2. Backend setup
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
```
Ensure the trained model weights are present at `backend/model/best_efficientnet_b4.pth`.

Run the server:
```bash
uvicorn main:app --reload
```
Backend runs at `http://127.0.0.1:8000` (Swagger docs at `/docs`).

### 3. Frontend setup
```bash
cd frontend
npm install
```
Create a `.env` file:
```
VITE_API_URL=http://127.0.0.1:8000
```
Run the dev server:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## 📡 API Reference

### `GET /`
Health check.
```json
{ "status": "ok" }
```

### `POST /predict`
Multipart form-data upload (`file`: image, JPG/JPEG/PNG supported).

**Response:**
```json
{ "label": "fake", "confidence": 0.9834 }
```
or
```json
{ "label": "real", "confidence": 0.9472 }
```

---

## 🧪 Benchmarking Results

Three architectures were evaluated on a held-out test set of 5,997 images:

| Metric | EfficientNet-B4 | Xception | CLIP (ViT-L/14) |
|---|---|---|---|
| Test Accuracy | 96.60% | 94.45% | 88.36% |
| AUC | — | 0.9951 | 0.9544 |
| Precision (Fake) | 0.9550 | — | 0.9000 |
| Recall (Fake) | 0.9780 | — | 0.8600 |
| F1-Score | 0.9664 | — | 0.8809 |

**EfficientNet-B4** was selected as the production model for its balanced accuracy/precision at the standard 0.5 decision threshold and a safer forensic error bias (138 false positives vs. 66 false negatives — missing an actual deepfake is costlier than a false alarm).
