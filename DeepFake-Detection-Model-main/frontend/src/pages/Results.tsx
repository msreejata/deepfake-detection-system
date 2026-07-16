import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import type { DetectionResult } from '../services/api';

interface LocationState {
  result: DetectionResult;
  fileName: string;
}

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  // If someone lands here directly (refresh, bookmark, etc) there's no
  // result to show, so send them back to upload instead of showing junk.
  if (!state?.result) {
    return (
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600 mb-4">No analysis result to show yet.</p>
        <button
          onClick={() => navigate('/upload')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Upload an Image
        </button>
      </div>
    );
  }

  const { result, fileName } = state;
  const isDeepfake = result.label === 'fake';
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          {isDeepfake ? (
            <XCircle className="text-red-500 h-16 w-16" />
          ) : (
            <CheckCircle className="text-green-500 h-16 w-16" />
          )}
        </div>
        <p className="text-center text-2xl font-bold mb-2">
          {isDeepfake ? 'Deepfake Detected' : 'Authentic Content'}
        </p>
        <p className="text-center text-gray-600 mb-1">
          Confidence Score: {confidencePercent}%
        </p>
        <p className="text-center text-sm text-gray-400 mb-4">{fileName}</p>
        <div className="border-t pt-4">
          <button
            onClick={() => navigate('/upload')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Analyze Another Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
