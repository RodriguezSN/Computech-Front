import { Avatar, Blockquote, Rating } from "flowbite-react";
import { auth } from '../../firebase/firebase';
import { useEffect, useState } from 'react'; 

export function ReviewsDetailProduct({ reviews}) {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  console.log(reviews)

  useEffect(() => {
    // Suscribirse al cambio de estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Actualizar el estado del usuario
    });

    // Devuelve una función de limpieza para cancelar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  if (!reviews || reviews.length === 0) {
    return <p>No hay comentarios aún.</p>;
  }

  
  return (
    <div>
  
      {reviews.map((review, index) => (
        <figure className="max-w-screen-md" key={index}>
          <div className="mb-4 flex items-center">
          <Avatar
              rounded
              size="xs"
              img={user ? user.photoURL : ''} 
              alt="profile picture"
            />
            <Rating size="md">
              {[...Array(review.ranking)].map((_, idx) => (
                <Rating.Star key={idx} />
              ))}
            </Rating>
          </div >
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
  {review.User.name}
</p>
          
          <Blockquote>
          <div class="text-3xl">{review.comment}</div>
            
          </Blockquote>
          <figcaption className="mt-6 flex items-center space-x-3">
            
            <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-gray-900 dark:text-white">{review.name}</cite>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}