import React from 'react';
import { useDispatch } from 'react-redux';
import { setPriceOrder } from '../../redux/actions/actions';

const ByPrice = ({ resetNameOrder }) => {
  const dispatch = useDispatch();

  const handleOrderChange = (e) => {
    dispatch(setPriceOrder(e.target.value));
    resetNameOrder(); // Resetear el orden alfabético
  };

  return (
    <div className="py-2">
      <select name='' onChange={handleOrderChange} value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center">
        <option value="" className="text-slate-500 dark:text-gray-400">Orden por precio</option> {/* Placeholder */}
        <option value="asc" className="text-slate-500 dark:text-gray-400">Menor a Mayor</option>
        <option value="desc" className="text-slate-500 dark:text-gray-400">Mayor a Menor</option>
      </select>
    </div>
  );
};

export default ByPrice;
