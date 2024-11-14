import React, { useState, useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import axios from 'axios';

const PayPalButton = ({ total, items }) => {
    const [user] = useAuthState(auth);
    const [userId, setUserId] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            fetch('http://localhost:3001/users')
                .then(response => response.json())
                .then(data => {
                    const matchingUser = data.find(u => u.mail === user.email);
                    if (matchingUser) {
                        setUserId(matchingUser.id_User);
                    }
                })
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [user]);

    useEffect(() => {
        if (details && userId) {
            handleOrderComplete(details, userId);
        }
    }, [details, userId]);

    const handleOrderComplete = async (detail, userId) => {
        console.log('handleOrderComplete - userId:', userId);

        if (detail.status === 'COMPLETED') {
            const formattedOrder = {
                payer: {
                    address: {
                        country_code: detail.payer.address?.country_code || ''
                    },
                    email_address: detail.payer.email_address || '',
                    name: {
                        given_name: detail.payer.name?.given_name || '',
                        surname: detail.payer.name?.surname || ''
                    },
                    payer_id: detail.payer.payer_id || ''
                },
                purchase_units: detail.purchase_units.map(unit => ({
                    amount: {
                        currency_code: unit.amount?.currency_code || '',
                        value: unit.amount?.value || ''
                    },
                    payee: {
                        email_address: unit.payee?.email_address || '',
                        merchant_id: unit.payee?.merchant_id || ''
                    },
                    payments: {
                        captures: unit.payments.captures.map(capture => ({
                            amount: {
                                currency_code: capture.amount?.currency_code || '',
                                value: capture.amount?.value || ''
                            },
                            create_time: capture.create_time || '',
                            final_capture: capture.final_capture || false,
                            id: capture.id || '',
                            seller_protection: {
                                dispute_categories: capture.seller_protection?.dispute_categories || [],
                                status: capture.seller_protection?.status || ''
                            },
                            status: capture.status || '',
                            update_time: capture.update_time || ''
                        }))
                    },
                    reference_id: unit.reference_id || '',
                    shipping: {
                        address: {
                            address_line_1: unit.shipping?.address?.address_line_1 || '',
                            admin_area_1: unit.shipping?.address?.admin_area_1 || '',
                            admin_area_2: unit.shipping?.address?.admin_area_2 || '',
                            country_code: unit.shipping?.address?.country_code || '',
                            postal_code: unit.shipping?.address?.postal_code || ''
                        },
                        name: {
                            full_name: unit.shipping?.name?.full_name || ''
                        }
                    },
                    soft_descriptor: unit.soft_descriptor || ''
                })),
                status: detail.status || '',
                update_time: detail.update_time || ''
            };

            console.log('formattedOrder:', formattedOrder);

            try {
                await axios.post(`http://localhost:3001/order/create-order/${userId}`, formattedOrder);
                console.log('Datos del pedido enviados correctamente:', formattedOrder);

                // Reducir el stock de los productos en la base de datos
                for (const item of items) {
                    // Obtener el stock actual del producto
                    const productResponse = await axios.get(`http://localhost:3001/products/${item.id_Product}`);
                    
                    const currentStock = productResponse.data.product.stock;
                    

                    // Calcular el nuevo stock
                    const newStock = currentStock - item.quantity;
                    

                    // Actualizar el stock del producto
                    const response = await axios.put(`http://localhost:3001/products/${item.id_Product}`, {
                        stock: newStock
                    });

                    if (response.status !== 200) {
                        throw new Error(`No se pudo actualizar el stock para el producto ${item.name}`);
                    }
                }

                Swal.fire({
                    icon: 'success',
                    title: '¡Felicitaciones!',
                    text: 'Tu compra se realizó con éxito y el stock ha sido actualizado.',
                    confirmButtonText: 'Aceptar'
                });

            } catch (error) {
                console.error(`Error al enviar los datos del pedido: ${userId}`, error.response?.data || error.message);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al procesar el pedido o actualizar el stock.",
                });
            }
        }
    };

    return (
        <PayPalButtons
            style={{ layout: 'horizontal' }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        description: items.map(item => item.name).join(', '), // Combine item names for description
                        amount: {
                            value: total.toFixed(2),
                        }
                    }]
                });
            }}
            onApprove={async (data, actions) => {
                try {
                    const details = await actions.order.capture();
                    Swal.fire({
                        icon: 'success',
                        title: `¡Felicitaciones ${details.payer.name.given_name}!`,
                        text: 'Tu compra se realizó con éxito.',
                        confirmButtonText: 'Aceptar'
                    });

                    if (details.status === 'COMPLETED') {
                        console.log('Transacción exitosa ' + details.payer.name.given_name);
                        console.log('Detalles de la orden:', details);

                        // Establecer los detalles para manejar la orden cuando userId esté disponible
                        setDetails(details);
                    }

                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal...",
                        footer: <a href="http://localhost:5173/cart">Volver al carrito</a>
                    });
                    console.error('Error capturando la orden:', error);
                }
            }}
        />
    );
};

export default PayPalButton;
