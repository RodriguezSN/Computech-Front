import React from 'react';
import { useDispatch } from 'react-redux';
import { setNameOrder } from '../../redux/actions/actions';

const ByName = ({ resetPriceOrder }) => {
  const dispatch = useDispatch();

  const handleOrderByName = (event) => {
    dispatch(setNameOrder(event.target.value));
    resetPriceOrder(); // Resetear el orden de precio
  };

  return (
    <div className="py-2">
      <select name='' onChange={handleOrderByName} value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center">
        <option value="" className="text-slate-500 dark:text-gray-400">Orden alfabético</option> {/* Placeholder */}
        <option value="a-z" className="text-slate-500 dark:text-gray-400">A-Z</option>
        <option value="z-a" className="text-slate-500 dark:text-gray-400">Z-A</option>
      </select>
    </div>
  );
};

export default ByName;
