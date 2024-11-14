import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import Pagination from '../pagination/Pagination';

const Cards = ({ products, filterApplied }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataQt = 12;
  const averageRatings = useSelector(state => state.averageRatings);

  useEffect(() => {
    // Reset current page to 1 whenever filterApplied changes
    setCurrentPage(1);
  }, [filterApplied]);

  const totalPages = Math.ceil(products.length / dataQt);
  const indexFinal = currentPage * dataQt;
  const indexInicial = indexFinal - dataQt;
  const productsToDisplay = products.slice(indexInicial, indexFinal);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="sm:grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4">
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((product) => (
              <Card
                key={product.id_Product}
                id_Product={product.id_Product}
                name={product.name}
                image={product.image}
                price={product.price}
                averageRating={averageRatings[product.id_Product]?.averageRanking || 0} // Obtener la media del ranking
              />
            ))
          ) : (
            <Spinner className='w-full' />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Cards;
