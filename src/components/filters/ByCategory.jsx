import React, { useState, useEffect } from 'react';
//import API_URL from "../../config";


const ByCategory = ({ setCategoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories'); // Endpoint para obtener categorías
        const data = await response.json();
        console.log('Datos de categorías recibidos:', data); 
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setCategoryFilter(category);
  };

  return (
    <div className="content-center">
      <form className="max-w-sm mx-auto content-center">
        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">Elige una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default ByCategory;