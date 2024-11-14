import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flowbite } from 'flowbite-react';
import Cards from '../../components/cards/Cards';
import { getProducts, getBrands, filterByBrand, getCategories, filterByCategory, searchProductsByName, setNameOrder, setPriceOrder } from '../../redux/actions/actions';
import CarouselComponent from '../../components/carousel/carousel';
import ByName from '../../components/filters/ByName';
import ByPrice from '../../components/filters/ByPrice';
import Spinner from '../../components/spinner/Spinner';

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const filteredProducts = useSelector((state) => state.filteredProducts);
  const brands = useSelector(state => state.brands);
  const categories = useSelector(state => state.categories);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [filterApplied, setFilterApplied] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const handleBrandFilter = (e) => {
    const selectedValue = e.target.value;
    dispatch(filterByBrand(selectedValue));
    setBrand(selectedValue);
    setFilterApplied(prev => prev + 1);
  };

  const handleCategoriesFilter = (e) => {
    const selectedValue = e.target.value;
    dispatch(filterByCategory(selectedValue));
    setCategory(selectedValue);
    setFilterApplied(prev => prev + 1);
  };

  const handleSearch = (searchQuery) => {
    dispatch(searchProductsByName(searchQuery));
    dispatch(filterByBrand(''));
    dispatch(filterByCategory(''));
    setBrand('');
    setCategory('');
    setFilterApplied(prev => prev + 1);
  };

  const handleResetSearch = () => {
    dispatch(getProducts());
    dispatch(filterByBrand(''));
    dispatch(filterByCategory(''));
    setBrand('');
    setCategory('');
    setFilterApplied(prev => prev + 1);
    dispatch(searchProductsByName(''));
  };

  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return <Spinner />;
  }

  const activeProducts = allProducts.filter(product => product.active);
  const toShow = filteredProducts.length > 0 ? filteredProducts.filter(product => product.active) : activeProducts;
  console.log(allProducts)
  return (
    <>
      <Flowbite>
        <div className="bg-white antialiased dark:bg-gray-900 md:py-5">
          <div className="pt-16">
            <CarouselComponent />
            <div className="flex justify-center mb-4 "></div>
            <div className="flex overflow-x-auto sm:justify-center mb-2 space-x-4"> {/* Añadido espacio horizontal */}
              <ByName resetPriceOrder={() => dispatch(setPriceOrder(''))} />
              <ByPrice resetNameOrder={() => dispatch(setNameOrder(''))} />
              <div className="content-center">
                <select
                  id="brands"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center"
                  value={brand}
                  onChange={handleBrandFilter}
                >
                  <option value="">Elige una marca</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div className="content-center">
                <select
                  id="categories"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center"
                  value={category}
                  onChange={handleCategoriesFilter}
                >
                  <option value="">Elige una categoría</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleResetSearch}
                className="h-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-5 px-1 flex items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 content-center mt-1.5" // Ajuste de altura
              >
                Reiniciar
              </button>
            </div>
            <Cards
              products={toShow}
              filterApplied={filterApplied}
            />
          </div>
        </div>
      </Flowbite>
    </>
  );
};

export default Home;