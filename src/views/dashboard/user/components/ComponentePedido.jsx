import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAllSales } from "../../../../redux/actions/actions";
import { auth } from "../../../../firebase/firebase";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactStars from "react-rating-stars-component";

const MySwal = withReactContent(Swal);

const ComponentePedido = () => {
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const allSales = useSelector((state) => state.allSales);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.email) {
      fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => {
          const matchingUser = data.find(u => u.mail === user.email);
          if (matchingUser) {
            setUserId(matchingUser.id_User);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [user]);

  const openCommentModal = (product) => {
    let ranking = 0; // Initial ranking value

    MySwal.fire({
      title: `Dejar Comentario para ${product.name}`,
      html: (
        <div>
          <label htmlFor="comment" className="block text-left">
            Comentario:
          </label>
          <textarea
            id="comment"
            className="swal2-textarea"
            placeholder="Escribe tu comentario aquí"
          ></textarea>
          <label htmlFor="ranking" className="block text-left mt-4">
            Puntuación:
          </label>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            onChange={(newRating) => {
              ranking = newRating; // Update the ranking value when stars are clicked
            }}
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Enviar",
      preConfirm: () => {
        const comment = Swal.getPopup().querySelector("#comment").value;
        if (!comment || ranking === 0) {
          Swal.showValidationMessage(`Por favor ingresa un comentario y una puntuación`);
        }
        return { comment, ranking };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handlerSubmit(product, result.value.comment, result.value.ranking);
      }
    });
  };

  const handlerSubmit = async (product, comment, ranking) => {
    try {
      const reviewData = {
        userId: userId,
        productId: product.id_Product,
        ranking,
        comment,
        status: 'pending' // Set status to pending
      };
      const response = await axios.post("http://localhost:3001/reviews", reviewData);
      console.log("Review created:", response.data);
      Swal.fire("¡Éxito!", "Tu comentario ha sido enviado.", "success");
    } catch (error) {
      console.error("Error creating review:", error);
      Swal.fire("Error", "Hubo un problema enviando tu comentario.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 flex flex-col gap-6 dark:bg-gray-800 dark:text-white w-full">
        <ul className="flex flex-col gap-6">
          {allSales
            .filter((order) => order.userInformation.emailLogin === user?.email)
            .map((order) => (
              <div key={order.id_Order} className="w-full">
                {order.paymentInformation?.shoppingCart.map((product) => (
                  <div
                    key={product.id_Product}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg p-6 shadow-md flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{order.userInformation.emailLogin}</p>
                        <p className="text-gray-600 dark:text-gray-400">${order.paymentInformation.total}</p>
                      </div>
                    </div>
                    <button
                      className="flex ml-auto text-white bg-blue-700 hover:bg-blue-800 border-0 py-2 px-6 focus:outline-none rounded"
                      onClick={() => openCommentModal(product)}
                    >
                      DEJAR COMENTARIO
                    </button>
                  </div>
                ))}
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentePedido;
