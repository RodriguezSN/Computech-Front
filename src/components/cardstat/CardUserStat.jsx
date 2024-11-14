import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Text } from '@tremor/react';

const TopRatedProducts = () => {
    // Obtener el estado de Redux
    const averageRatings = useSelector((state) => state.averageRatings);

    // Convertir el objeto en un array
    const averageRatingsArray = Object.values(averageRatings);

    // Ordenar los productos por valoración y tomar los tres primeros
    const topRatedProducts = averageRatingsArray
        .sort((a, b) => b.averageRanking - a.averageRanking)
        .slice(0, 3);

    return (
        <Card className="mx-auto max-w-xs" decoration="top" fill="#8884d8">
            <p className="text-sm text-tremor-content dark:text-dark-tremor-content">Top 3 Productos Mejor Valorados:</p>
            {topRatedProducts.map((product, index) => (
                <div key={index} className="mt-1">
                    <p className="text-base text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                        {product.name}
                    </p>
                    <p className="text-xs text-tremor-content dark:text-dark-tremor-content">
                        Valoración: {product.averageRanking} ⭐
                    </p>
                </div>
            ))}
        </Card>
    );
};

export default TopRatedProducts;
