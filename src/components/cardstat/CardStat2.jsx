import { useSelector } from "react-redux";
import { Card, Text } from "@tremor/react";

const CardStat2 = () => {
    // Obtener el estado de Redux
    const allSales = useSelector((state) => state.allSales);

    // Calcular las ganancias totales
    const totalEarnings = allSales.reduce((accumulator, sale) => {
        const total = parseFloat(sale.paymentInformation.total);
        return !isNaN(total) ? accumulator + total : accumulator;
    }, 0);

    // Calcular el número total de pedidos
    const totalOrders = allSales.length;

    return (
        <Card
            className="mx-auto max-w-xs"
            decoration="top"
            fill="#8884d8"
        >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Ganancias totales:</p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                ${totalEarnings.toFixed(2)}
            </p>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-2">
                en {totalOrders} pedidos
            </p>
        </Card>
    );
}

export default CardStat2
