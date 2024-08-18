import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

interface Feedback {
  id: string;
  profileImage: string;
  userName: string;
  overallExperience: number;
  toolFunctionality: number;
  peerSupportQuality: number;
  comments: string;
  createdAt: string;
}

interface FeedbackListProps {
  userId: string; // Keep userId to fetch specific feedback
  feedbacksUpdated: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ userId, feedbacksUpdated }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averages, setAverages] = useState({
    overallExperience: 0,
    toolFunctionality: 0,
    peerSupportQuality: 0,
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`/api/feedback/${userId}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setFeedbacks(data.feedbacks);

      // Calculate averages if feedbacks are not empty
      if (data.feedbacks.length > 0) {
        const totalFeedbacks = data.feedbacks.length;
        setAverages({
          overallExperience: data.feedbacks.reduce((sum: any, f: { overallExperience: any; }) => sum + f.overallExperience, 0) / totalFeedbacks,
          toolFunctionality: data.feedbacks.reduce((sum: any, f: { toolFunctionality: any; }) => sum + f.toolFunctionality, 0) / totalFeedbacks,
          peerSupportQuality: data.feedbacks.reduce((sum: any, f: { peerSupportQuality: any; }) => sum + f.peerSupportQuality, 0) / totalFeedbacks,
        });
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [userId, feedbacksUpdated]);

  return (
    <div>
     <div className="mb-6 mt-6">
      <h2 className="text-2xl font-semibold border-b-4 border-b-lime-700 mb-4">Average Ratings</h2>
      <div className="flex space-x-4 justify-center">
        <div className="bg-amber-50 p-4 rounded-lg shadow-lg text-center w-1/3">
          <p className="text-lg font-bold text-amber-700">
            <span className="font-serif text-5xl text-green-700">{averages.overallExperience.toFixed(2)}</span>
            out of 5
          </p>
          <p className="text-sm text-purple-700 font-semibold mt-2">Overall Experience</p>
          <div className="flex justify-center mt-2">
            <ReactStars count={5} size={32} value={averages.overallExperience} edit={false} />
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg shadow-lg text-center w-1/3">
          <p className="text-lg font-bold text-amber-700">
            <span className="font-serif text-5xl text-green-700">{averages.toolFunctionality.toFixed(2)}</span>
            out of 5
          </p>
          <p className="text-sm text-purple-700 font-semibold mt-2">Tool Functionality</p>
          <div className="flex justify-center mt-2">
            <ReactStars count={5} size={32} value={averages.toolFunctionality} edit={false} />
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg shadow-lg text-center w-1/3">
          <p className="text-lg font-bold text-amber-700">
            <span className="font-serif text-5xl text-green-700">{averages.peerSupportQuality.toFixed(2)}</span>
            out of 5
          </p>
          <p className="text-sm text-purple-700 font-semibold mt-2">Peer Support Quality</p>
          <div className="flex justify-center mt-2">
            <ReactStars count={5} size={32} value={averages.peerSupportQuality} edit={false} />
          </div>
        </div>
      </div>
    </div>
      <div className="overflow-y-auto max-h-96">
        {feedbacks.map((feedback) => (
          <figure key={feedback.id} className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <figcaption className="flex items-center gap-4 mb-4">
              <img className="h-16 w-16 rounded-full border border-gray-300" src={feedback.profileImage} alt={feedback.userName} />
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-gray-900">{feedback.userName}</div>
                <div className="text-sm text-gray-600">{new Date(feedback.createdAt).toLocaleDateString()}</div>
              </div>
            </figcaption>
            <blockquote className="mb-4">
              <p className="text-lg font-semibold text-gray-800">"{feedback.comments}"</p>
            </blockquote>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Overall Experience</span>
                <span>Tool Functionality</span>
                <span>Peer Support Quality</span>
              </div>
              <div className="flex justify-between items-center">
                <ReactStars count={5} size={24} value={feedback.overallExperience} edit={false} color2="#ffd700" />
                <ReactStars count={5} size={24} value={feedback.toolFunctionality} edit={false} color2="#ffd700" />
                <ReactStars count={5} size={24} value={feedback.peerSupportQuality} edit={false} color2="#ffd700" />
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
