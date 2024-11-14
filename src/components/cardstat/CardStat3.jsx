import { useDispatch,useSelector } from "react-redux"
import { getProducts } from "../../redux/actions/actions"
import { useEffect,useState } from "react"
import { Card, Metric, Text } from "@tremor/react"

const CardStat3 = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProducts);
   

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const totalStock = allProducts.map(product => product.stock)
    .reduce((acumulador,stockActual) =>acumulador + stockActual,0)
    
    return (

        <Card
            className="mx-auto max-w-xs"
            decoration="top"
            fill="#8884d8"
        >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Productos en stock: </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">{totalStock}</p>
        </Card>

    )
}



export default CardStat3