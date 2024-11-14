import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSales } from '../../redux/actions/actions';
import Swal from 'sweetalert2';

export function TableDashboardOrders() {
    const dispatch = useDispatch();
    const allSales = useSelector((state) => state.allSales);
    
    // Estado local para manejar el estado activo/inactivo de cada usuario
    const [userStatus, setUserStatus] = useState({});

    useEffect(() => {
        dispatch(getAllSales());
    }, [dispatch]);

    useEffect(() => {
        // const statusMap = {};
        // allSales.forEach(user => {
        //   statusMap[user.id] = user.status === 'Online' ? 'activo' : 'inactivo';
        // });
        // setUserStatus(statusMap);
    }, [allSales]);

    const handleStatusChange = (userId, status) => {
        setUserStatus(prevStatus => ({
            ...prevStatus,
            [userId]: status,
        }));
    };

    const handlerSubmit = (shoppingCart) => {    
        const totalAmount = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);

        const cartDetails = `
            <table class="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th class="px-4 py-2" style="min-width: 100px;">Nombre</th>
                        <th class="px-4 py-2" style="min-width: 100px;">Precio</th>
                        <th class="px-4 py-2" style="min-width: 110px;">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${shoppingCart.map(item => `
                        <tr>
                            <td class="border px-4 py-2">${item.name}</td>
                            <td class="border px-4 py-2">${item.price}</td>
                            <td class="border px-4 py-2">${item.quantity}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="2" class="border px-4 py-2 font-bold">Total</td>
                        <td class="border px-4 py-2 font-bold">${totalAmount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;

        Swal.fire({
            title: 'Detalle de la orden',
            html: cartDetails,
        });
    }

    return (
        <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ORDENES DE COMPRA
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Monto
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allSales.map((order) => (
                        <tr key={order.id_Order} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="flex items-center px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{order.id_Order}</div>
                                    <div className="font-normal text-gray-500">{order.mail}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                {order.userInformation.emailLogin}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    {order.paymentInformation.total}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handlerSubmit(order.paymentInformation.shoppingCart)}>VER DETALLE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
