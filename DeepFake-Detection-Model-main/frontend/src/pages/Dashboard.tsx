import React from 'react';
import { BarChart, PieChart, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  // This is a placeholder. In a real application, you would fetch this data from your backend.
  const recentAnalyses = [
    { id: 1, filename: 'video1.mp4', result: 'Authentic', date: '2024-03-15' },
    { id: 2, filename: 'image2.jpg', result: 'Deepfake', date: '2024-03-14' },
    { id: 3, filename: 'video3.mp4', result: 'Authentic', date: '2024-03-13' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart className="mr-2" /> Analysis Statistics
          </h3>
          <p>Total Analyses: 50</p>
          <p>Deepfakes Detected: 15</p>
          <p>Authentic Content: 35</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <PieChart className="mr-2" /> Content Type Distribution
          </h3>
          <p>Images: 60%</p>
          <p>Videos: 40%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="mr-2" /> Recent Activity
          </h3>
          <ul className="space-y-2">
            {recentAnalyses.map((analysis) => (
              <li key={analysis.id} className="text-sm">
                <span className="font-medium">{analysis.filename}</span> - {analysis.result} ({analysis.date})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;