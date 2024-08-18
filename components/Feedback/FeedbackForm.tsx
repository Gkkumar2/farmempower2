import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import ReactStars from 'react-stars';

interface FeedbackFormProps {
  onFeedbackSubmitted: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onFeedbackSubmitted }) => {
  const { user } = useUser();
  const [overallExperience, setOverallExperience] = useState(0);
  const [toolFunctionality, setToolFunctionality] = useState(0);
  const [peerSupportQuality, setPeerSupportQuality] = useState(0);
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You need to be logged in to submit feedback');
      return;
    }

    const feedbackData = {
      overallExperience,
      toolFunctionality,
      peerSupportQuality,
      email: user.primaryEmailAddress?.emailAddress || '',
      userName: user.fullName || '',
      profileImage: user.imageUrl || '',
      userId: user.id,
      comments,
    };

    const res = await fetch(`/api/feedback/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (res.ok) {
      setComments('');
      setOverallExperience(0);
      setToolFunctionality(0);
      setPeerSupportQuality(0);
      onFeedbackSubmitted(); 
    } else {
      const result = await res.json();
      setError(result.error || 'Failed to submit feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-slate-50 rounded-lg shadow-md space-y-3">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Feedback</h2>
        <p className="font-semibold text-sm text-green-600">Your feedback helps us improve</p>
      </div>
      <div className="space-y-2">
        <label className="block text-lg">
          <span className="text-amber-700">Overall Experience</span>
          <ReactStars
            count={5}
            size={25}
            value={overallExperience}
            onChange={setOverallExperience}
            half={false}
            className="mt-1"
          />
        </label>
        <label className="block text-lg">
          <span className="text-amber-700">Tool Functionality</span>
          <ReactStars
            count={5}
            size={25}
            value={toolFunctionality}
            onChange={setToolFunctionality}
            half={false}
            className="mt-1"
          />
        </label>
        <label className="block text-lg">
          <span className="text-amber-700">Peer Support Quality</span>
          <ReactStars
            count={5}
            size={25}
            value={peerSupportQuality}
            onChange={setPeerSupportQuality}
            half={false}
            className="mt-1"
          />
        </label>
        <label className="block text-lg">
          <span className="text-amber-700">Comments</span>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Additional comments..."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-sm"
            rows={3}
          />
        </label>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
    </form>
  );
};

export default FeedbackForm;
