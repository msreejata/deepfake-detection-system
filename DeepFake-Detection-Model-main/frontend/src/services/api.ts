// Base URL for the backend. Set VITE_API_URL in a .env file when the
// backend isn't running on localhost:8000 (e.g. when deployed).
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface DetectionResult {
  label: 'real' | 'fake';
  confidence: number; // 0 to 1
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function detectDeepfake(file: File): Promise<DetectionResult> {
  const formData = new FormData();
  formData.append('file', file);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });
  } catch {
    // This branch fires when the server is unreachable (not running,
    // wrong URL, CORS blocked, etc), not for normal HTTP error codes.
    throw new ApiError(
      'Could not reach the detection server. Make sure the backend is running.'
    );
  }

  if (!response.ok) {
    throw new ApiError(`Analysis failed (server responded with ${response.status})`);
  }

  const data = await response.json();
  return data as DetectionResult;
}
