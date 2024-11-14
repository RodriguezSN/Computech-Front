import React from 'react';

const AccountLocked = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-600 text-white p-4">
          <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Lo sentimos</h2>
            <p className="mb-4">Su cuenta ha sido bloqueada.</p>
            <p className="mb-4">Contacta con nuestro servicio de soporte para más información:</p>
            <a href="mailto:computechsoyhenry@gmail.com" className="text-blue-500 hover:underline">
              computechsoyhenry@gmail.com
            </a>
          </div>
        </div>
      );
    };
    

export default AccountLocked;
