import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';
import { useEffect } from 'react';

import { BarChart } from '@tremor/react';




export function Chart() {
    const dataFormatter = (number) =>
        Intl.NumberFormat('us').format(number).toString();

    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);

    let products = allProducts.map(p => {
        return { 
            name: p.name, 
            stock: p.stock,
            minimo: 3
        };
    });
    

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <>
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Stock de productos
            </h3>
            <BarChart
                className="mt-6"
                data={products}
                index="name"
                categories={['stock']}
                colors={['blue','green']}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
            />
        </>
    );
}