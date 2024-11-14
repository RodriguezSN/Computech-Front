import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';
import { useEffect } from 'react';
import React, { useState } from 'react';

import { BarChart } from '@tremor/react';





export function ChartCategories() {

    const allSales = useSelector(state => state.allSales);
    const dataFormatter = (number) =>
        Intl.NumberFormat('us').format(number).toString();

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);

    const productSales = {};

    allSales.forEach(sale => {
        sale.paymentInformation.shoppingCart.forEach(item => {
            if (productSales[item.name]) {
                productSales[item.name] += 1;
            } else {
                productSales[item.name] = 1;
            }
        });
    });
    

    const soldProducts = Object.keys(productSales).map(productName => ({
                name: productName,
                ventas: productSales[productName]
            }));
            



    let products = soldProducts.map(p => {
        return { 
            name: p.name, 
            ventas: p.ventas,
            
        };
    });
  

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    
    return (
        <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Productos vendidos
            </h3>
            <BarChart
                className="mt-6"
                data={products}
                index="name"
                categories={['ventas']}
                colors={['blue','green']}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
            />
        </>
    );
}

