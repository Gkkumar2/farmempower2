import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import ReactStars from 'react-stars';
import { useRouter } from 'next/navigation';

interface ReviewFormProps {
  practiceId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ practiceId, onReviewSubmitted }) => {
  const { user } = useUser();
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You need to be logged in to submit a review');
      return;
    }

    const reviewData = {
      stars,
      review,
      email: user.primaryEmailAddress?.emailAddress || '',
      userName: user.fullName || '',
      profileImage: user.imageUrl || '',
      practiceId,
      userId: user.id,
    };

    const res = await fetch(`/api/reviews/${practiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (res.ok) {
      setReview('');
      setStars(0);
      onReviewSubmitted(); // Trigger a re-fetch of reviews
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Leave a Review</h2>
        <p className="text-gray-600">Share your thoughts about this practice</p>
      </div>
      <div className="flex justify-center">
        <ReactStars
          count={5}
          size={44}
          value={stars}
          onChange={setStars}
          half={false}
          className="focus:outline-none"
        />
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
