import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideBarAdmin from '../../components/sidebaradmin/SideBarAdmin';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const allSales = useSelector((state) => state.allSales);

  useEffect(() => {
    // Fetch all reviews
    axios.get("http://localhost:3001/reviews")
      .then(response => {
        setReviews(response.data);
        // Filter reviews with status 'pending'
        setPendingReviews(response.data.filter(review => review.status === 'pending'));
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      await axios.put(`http://localhost:3001/reviews/${reviewId}`, { status: 'approved' });
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id_Review === reviewId ? { ...review, status: 'approved' } : review
        )
      );
      setPendingReviews(prevReviews => prevReviews.filter(review => review.id_Review !== reviewId));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await axios.put(`http://localhost:3001/reviews/${reviewId}`, { status: 'rejected' });
      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.id_Review === reviewId ? { ...review, status: 'rejected' } : review
        )
      );
      setPendingReviews(prevReviews => prevReviews.filter(review => review.id_Review !== reviewId));
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const renderStars = (ranking) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i <= ranking ? 'text-yellow-400' : 'text-gray-300'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.878a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.97 2.878c-.785.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.172 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
        </svg>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="pt-16">
  <div className="flex min-h-screen bg-white antialiased dark:bg-gray-800 md:py-5">
    <SideBarAdmin></SideBarAdmin>
      
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 antialiased md:py-5">
        <div className="w-full lg:w-5/6 p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Reseñas Pendientes</h2>
            {pendingReviews.length === 0 ? (
              <p className="text-gray-800 dark:text-gray-200">No hay reseñas pendientes</p>
            ) : (
              pendingReviews.map(review => (
                <div key={review.id_Review} className="bg-white p-6 rounded-lg shadow mb-4 dark:bg-gray-800 dark:border-gray-700">
                  <div className="mb-2">
                    <p className="text-gray-900 dark:text-gray-100"><strong>Usuario:</strong> {review.User.name}</p>
                    <p className="text-gray-900 dark:text-gray-100"><strong>Producto:</strong> {review.Product.name}</p>
                  </div>
                  <div className="mb-2">
                    {renderStars(review.ranking)}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200"><strong>Comentario:</strong> {review.comment}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleApprove(review.id_Review)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleReject(review.id_Review)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminReviews;