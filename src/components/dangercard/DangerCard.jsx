import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { RiAlarmWarningLine, RiCheckboxCircleLine } from '@remixicon/react';
import { Callout, Card } from '@tremor/react';
import { TextInput } from '@tremor/react';
import { Button } from '@tremor/react';

import { deleteProduct } from '../../redux/actions/actions';


export function DangerCard() {
    const[value, setValue] = useState('')
    
    const dispatch = useDispatch();
    
    const handlerValue = (event)=>{
        
        setValue(event.target.value)
    } 
    

    const handlerSubmit =()=>{
        dispatch(deleteProduct(value,true));
        Swal.fire("Producto eliminado de la Base de datos");  
    }
    return (
        <div className="space-y-6">
            <Card className="mx-auto max-w-md">
                <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Advertencia</p>
                <Callout
                    className="mt-4"
                    title="ZONA DE PELIGRO"
                    icon={RiAlarmWarningLine}
                    color="rose"
                >
                    En esta zona puede borrar de manera permanente cualquier producto del stock.
                </Callout>
                <div className='flex mt-5'>
                    <TextInput className="mx-auto max-w-xs" placeholder="Ingrese id de producto..." onChange={handlerValue} value= {value}/>
                    <Button variant="primary" color='red' onClick={handlerSubmit}>Eliminar producto</Button>
                </div>
            </Card>
        </div>
    );
} 
