import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, BarChart2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Deepfake Detector</h1>
      <p className="text-xl mb-8">Detect manipulated images and videos with our advanced AI technology</p>
      <div className="flex justify-center space-x-4">
        <Link to="/upload" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Upload className="mr-2" />
          Upload Media
        </Link>
        <Link to="/dashboard" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <BarChart2 className="mr-2" />
          View Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;