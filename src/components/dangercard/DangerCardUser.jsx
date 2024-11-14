import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { RiAlarmWarningLine } from '@remixicon/react';
import { Callout, Card } from '@tremor/react';
import { TextInput } from '@tremor/react';
import { Button } from '@tremor/react';

import { deleteUser } from '../../redux/actions/actions';

export function DangerCardUser() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    
    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = () => {
        dispatch(deleteUser(value));
    };

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
                    En esta zona puede desactivar cualquier usuario.
                </Callout>
                <div className='flex mt-5'>
                    <TextInput 
                        className="mx-auto max-w-xs" 
                        placeholder="Ingrese el correo del usuario..." 
                        onChange={handleValueChange} 
                        value={value} 
                    />
                    <Button variant="primary" color='red' onClick={handleSubmit}>Desactivar usuario</Button>
                </div>
            </Card>
        </div>
    );
}