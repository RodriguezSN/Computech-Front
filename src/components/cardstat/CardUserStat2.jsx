import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Text } from '@tremor/react';

const TotalUsersCard = () => {
    // Obtener el estado de Redux
    const allUsers = useSelector((state) => state.allUsers);

    // Calcular el número total de usuarios
    const totalUsers = allUsers.length;

    return (
        <Card className="mx-auto max-w-xs flex flex-col items-center justify-center text-center h-48" decoration="top" fill="#8884d8">
            <svg className="w-12 h-12 text-gray-800 dark:text-white mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm text-tremor-content dark:text-dark-tremor-content">Total de Usuarios Registrados:</p>
            <p className="text-2xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {totalUsers}
            </p>
        </Card>
    );
};

export default TotalUsersCard;
