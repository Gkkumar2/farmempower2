import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

interface Review {
  id: string;
  profileImage: string;
  userName: string;
  stars: number;
  review: string;
}

interface ReviewListProps {
  practiceId: string;
  reviewsUpdated: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ practiceId, reviewsUpdated }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews/${practiceId}`);
    const data: Review[] = await res.json();
    setReviews(data);

    const avgRating = data.reduce((sum, review) => sum + review.stars, 0) / data.length;
    setAverageRating(avgRating);
  };

  useEffect(() => {
    fetchReviews();
  }, [practiceId, reviewsUpdated]);

  return (
    <div>
      <div className="mb-6 mt-6">
        <h2 className="text-2xl font-semibold border-b-4 border-b-lime-700">Average Rating & Reviews</h2>
        <div className='grid grid-col mt-5'>
           <p className="text-xl font-bold text-amber-700"> <span className='font-serif text-7xl text-green-700'>{averageRating.toFixed(2)}</span> out of 5</p>
        <div className="flex items-center">
          <ReactStars count={5} size={44} value={averageRating} edit={false} />
          <span className="ml-2 text-xl">({reviews.length})</span>
        </div>
       
      </div>
      </div>
      <div className="overflow-y-auto max-h-96">
        {reviews.map((review) => (
          <figure key={review.id} className="relative rounded-2xl bg-gray-100 p-6 shadow-xl shadow-slate-900/10 mb-6">
            <svg aria-hidden="true" width="105" height="78" className="absolute top-6 left-6 fill-slate-100">
              <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
            </svg>
            <blockquote className="relative">
              <p className="text-lg tracking-tight text-slate-900">{review.review}</p>
            </blockquote>
            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
              <div>
                <div className="font-display text-base text-slate-900">{review.userName}</div>
                <div className="mt-1 text-sm text-slate-500">
                  <ReactStars count={5} size={24} value={review.stars} edit={false} />
                </div>
              </div>
              <div className="overflow-hidden rounded-full bg-slate-50">
                <img alt={review.userName} src={review.profileImage} className="h-14 w-14 object-cover" loading="lazy" width="56" height="56" />
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
