import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
  const {user} = useAuth();
  const { state } = useLocation();
  const { request } = state || {};
  console.log(request);
  const axiosSecure = useAxiosSecure();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("pls provide Your comment and ratings")
      return;
    }

    const feedbackData = {
      participant_id: request?._id,
      participant_name: request?.participant_name,
      email: request?.participant_email,
      rating,
      comment,
      participant_photo: user?.photoURL,
      camp_id: request?.camp_id
    };

    console.log("Feedback Submitted:", feedbackData);

    axiosSecure.post("/reviews", feedbackData)
    .then(res=>{
      if(res.data.insertedId){
        toast.success("Thank You for Your feedBack")
        setSubmitted(true);
      }
    })
  };

  return (
    <div className='px-7'>

    <SectionTitle
    subHeading={"SUBMIT YOUR FEEDBACK ABOUT THE CAMP"}
    heading={"FEEDBACK"}
    ></SectionTitle>


      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Feedback for {request?.camp_name}</h2>

      <div className="mb-6">
        <p><strong>Name:</strong> {request?.participant_name}</p>
        <p><strong>Email:</strong> {request?.participant_email}</p>
        <p><strong>Doctor:</strong> {request?.health_care_professional_name}</p>
        <p><strong>Location:</strong> {request?.location}</p>
      </div>

      {submitted ? (
        <div className="text-green-600 font-semibold text-center">Thank you for your feedback! ✅</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Rate your experience:</label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`text-2xl ${
                    rating >= num ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block font-medium">Comment:</label>
            <textarea
              id="comment"
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default FeedbackPage;
