import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Text } from "@tremor/react";
import Modal from 'react-modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Set the root element for the modal
Modal.setAppElement('#root');

const CardStat = () => {
    // Obtener el estado de Redux
    const allSales = useSelector(state => state.allSales);
    const allProducts = useSelector(state => state.allProducts);

    // Crear un mapeo de productos por nombre para obtener rápidamente la marca de cada producto
    const productBrandMap = {};
    allProducts.forEach(product => {
        productBrandMap[product.name] = product.BrandIdBrand;
    });

    // Procesar las ventas para obtener el total vendido por cada marca
    const brandSales = {};

    allSales.forEach(sale => {
        sale.paymentInformation.shoppingCart.forEach(item => {
            const brandName = productBrandMap[item.name];
            if (brandName) {
                if (brandSales[brandName]) {
                    brandSales[brandName] += 1;
                } else {
                    brandSales[brandName] = 1;
                }
            }
        });
    });

    // Convertir el objeto en un array
    const soldByBrand = Object.keys(brandSales).map(brandName => ({
        name: brandName,
        ventas: brandSales[brandName]
    }));

    // Ordenar marcas por cantidad vendida (descendente) y seleccionar las 3 primeras
    const topSoldByBrand = [...soldByBrand]
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 3);

    const totalSoldByBrand = soldByBrand.map(brand => brand.ventas)
        .reduce((accumulator, currentSold) => accumulator + currentSold, 0);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <Card
                className="mx-auto max-w-xs"
                decoration="top"
                fill="#8884d8"
                onClick={openModal}
                style={{ cursor: 'pointer' }}
            >
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Productos vendidos por marca: </p>
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold"></p>
                
                <div className="mt-4">
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Top marcas: </p>
                    {topSoldByBrand.map((brand, index) => (
                        <div key={index} className="flex justify-between">
                            <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{brand.name}</Text>
                            <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{brand.ventas}</Text>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Brand Sales Chart"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <h2>Productos vendidos por marca</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={soldByBrand}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#007CFF" />
                </BarChart>
                <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007CFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Cerrar
                </button>
            </Modal>
        </>
    );
}

export default CardStat;
