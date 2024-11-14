import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Text } from "@tremor/react";
import Modal from 'react-modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Set the root element for the modal
Modal.setAppElement('#root');

const CardSoldProducts = () => {
    // Obtener el estado de Redux
    const allSales = useSelector(state => state.allSales);

    // Procesar las ventas para obtener el total de cada producto
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

    // Convertir el objeto en un array
    const soldProducts = Object.keys(productSales).map(productName => ({
        name: productName,
        ventas: productSales[productName]
    }));

    // Ordenar productos por cantidad vendida (descendente) y seleccionar los 3 primeros
    const topSoldProducts = [...soldProducts]
        .sort((a, b) => b.ventas - a.ventas)
        .slice(0, 3);

    const totalSold = soldProducts.map(product => product.ventas)
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
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Productos vendidos: </p>
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{totalSold}</p>
                
                <div className="mt-4">
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Top ventas: </p>
                    {topSoldProducts.map((product, index) => (
                        <div key={index} className="flex justify-between">
                            <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{product.name}</Text>
                            <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">{product.ventas}</Text>
                        </div>
                    ))}
                </div>
            </Card>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Product Sales Chart"
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
                <h2>Productos vendidos</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={soldProducts}
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

export default CardSoldProducts;