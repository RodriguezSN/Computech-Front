import React, { useEffect, useState } from 'react';
//import API_URL from "../../config";


const ByBrand = ({ setBrandFilter }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:3001/brands'); 
        const data = await response.json();
        console.log('Datos de marcas recibidos:', data); 
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    console.log('Marca seleccionada:', brand); 
    setBrandFilter(brand);  
  };

  return (
    <div className="content-center">
      <form className="max-w-sm mx-auto content-center">
        <select
          id="brands"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center"
          onChange={handleBrandChange}
        >
          <option value="">Elige una marca</option> 
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default ByBrand;