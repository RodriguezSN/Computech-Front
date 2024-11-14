import { Select, SelectItem } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct,getAllProducts,setAllProducts } from '../../../redux/actions/actions';
import { useEffect } from 'react';

import { RiFlag2Line } from '@remixicon/react';
import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';

export function TableUsageExample() {


    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.allProductsActivesDesactives);
    
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);


    const handlerSubmit = (product) => {
        dispatch(deleteProduct(product, false));
        console.log("Entró!")
    }

    //console.log(allProducts)
    return (
        <Card>
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Lista de productos en Stock</h3>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Marca</TableHeaderCell>
                        <TableHeaderCell>Categoria</TableHeaderCell>
                        <TableHeaderCell>Precio unitario</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Cantidad</TableHeaderCell>
                        <TableHeaderCell>id del producto</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allProducts.map((item) => (
                        <TableRow key={item.id_Product}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.BrandIdBrand}</TableCell>
                            <TableCell>{item.CategoryIdCategory}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                                <Select
                                    defaultValue={item.active ? "1" : "2"}
                                    onValueChange={() => handlerSubmit(item.id_Product, false)}
                                >
                                    <SelectItem value="1">Activo</SelectItem>
                                    <SelectItem value="2">Inactivo</SelectItem>
                                </Select>
                            </TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.id_Product}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}