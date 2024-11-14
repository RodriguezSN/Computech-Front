import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMemoizedCartItems } from '../../redux/selectors/selectors';

const ProductDisplay = () => {
    const cartItems = useSelector(getMemoizedCartItems);

    return (
        <div className="pt-16">
            <div className="flex flex-col min-h-screen">
                <section className="flex-grow bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">
                            Productos
                        </h2>
                        {cartItems?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center mt-6 sm:mt-8">
                                <img src="https://www.ancestralanimalsoul.com/imagenes/carrito-vacio.png" alt="Carrito vacío" className="mx-auto mb-4 h-48 w-48" />
                                <p className="mt-6 sm:mt-8 text-2xl font-bold text-gray-500 dark:text-gray-400 text-center">
                                    No hay productos en el carrito
                                </p>
                                <Link to="/" className="mt-4 inline-block rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Seguir comprando
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    <ul className="space-y-6">
                                        {cartItems.map((item, index) => (
                                            <li key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <Link to={`/detail/${item.id_Product}`} className="shrink-0 md:order-1">
                                                        {item.image && (
                                                            <img
                                                                className="h-20 w-20 object-cover object-center"
                                                                src={item.image[0]}
                                                                alt={item.name}
                                                            />
                                                        )}
                                                    </Link>
                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <Link to={`/detail/${item.id_Product}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                                                            {item.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDisplay;
