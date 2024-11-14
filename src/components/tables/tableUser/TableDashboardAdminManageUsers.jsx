import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions/actions';
import axios from 'axios';
import Swal from 'sweetalert2';

export function TableDashboardAdminManageUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);

  // Estado local para manejar el estado activo/inactivo de cada usuario
  const [userStatus, setUserStatus] = useState({});
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const statusMap = {};
    const roleMap = {};
    allUsers.forEach(user => {
      statusMap[user.id_User] = user.active ? 'activo' : 'inactivo';
      roleMap[user.id_User] = user.rol ? 'Administrador' : 'Usuario';
    });
    setUserStatus(statusMap);
    setUserRoles(roleMap);
  }, [allUsers]);

  const handleStatusChange = async (userId, status) => {
    const isActive = status === 'activo';
    setUserStatus(prevStatus => ({
      ...prevStatus,
      [userId]: status,
    }));

    // Realiza la solicitud PUT al backend para actualizar el estado activo/inactivo del usuario
    try {
      await axios.put(`http://localhost:3001/users/put/${userId}`, {
        active: isActive
      });
      console.log(`Estado del usuario ${userId} actualizado a ${status}`);
      
      if (!isActive) {
        Swal.fire({
          icon: 'warning',
          title: '¡Atención!',
          text: 'Has desactivado este usuario',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  const handleRoleChange = async (userId, role) => {
    const isAdmin = role === 'Administrador';
    setUserRoles(prevRoles => ({
      ...prevRoles,
      [userId]: role,
    }));

    // Realiza la solicitud PUT al backend para actualizar el rol del usuario
    try {
      await axios.put(`http://localhost:3001/users/put/${userId}`, {
        rol: isAdmin
      });
      console.log(`Rol del usuario ${userId} actualizado a ${role}`);
    } catch (error) {
      console.error('Error al actualizar el rol del usuario:', error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id_User} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={user.image} alt={`${user.name} image`} />
                <div className="ps-3">
                  <div className="text-base font-semibold">{user.name}</div>
                  <div className="font-normal text-gray-500">{user.mail}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                <Select 
                  value={userRoles[user.id_User]} 
                  onValueChange={(value) => handleRoleChange(user.id_User, value)}
                >
                  <SelectItem value="Usuario">Usuario</SelectItem>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                </Select>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Select 
                    value={userStatus[user.id_User]} 
                    onValueChange={(value) => handleStatusChange(user.id_User, value)}
                  >
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </Select>
                </div>
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ver detalle</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
