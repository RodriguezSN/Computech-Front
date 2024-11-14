import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';
import { getUsers, updateDataUser } from '../../../redux/actions/actions';
import Header from "./components/Header";
import HistorialDePedidos from "./components/HistorialDePedidos";
import HistorialDeCompras from "./components/HistorialDeCompras";
import Edit from './components/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/spinner/Spinner';
import { Flowbite } from 'flowbite-react';
import { Card } from '@tremor/react';

const DashboardUser = () => {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const allUsers = useSelector((state) => state.allUsers);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const preset = "presetComputech";
  const cloudName = "damfsltm2";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const [url_imgs, setUrl_img] = useState("");
  const [perfilInfo, setPerfilInfo] = useState({
    name: "",
    address: "",
    phone: "",
    image: ""
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const matchedUser = allUsers.find((u) => u.mail === user.email);
      if (matchedUser) {
        setPerfilInfo(matchedUser);
        setIsLoading(false);
      }
    }
  }, [user, allUsers]);

  const changeUploadImage = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", preset);

      try {
        const response = await axios.post(url, data);
        urls.push(response.data.secure_url);
      } catch (error) {
        console.error("Error al subir la imagen", error);
      }
    }

    setUrl_img(urls);
    setPerfilInfo({ ...perfilInfo, image: urls[0] });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateDataUser(perfilInfo.id_User, perfilInfo));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfilInfo({ ...perfilInfo, [name]: value });
  };

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <Flowbite>
      <div className="pt-10 dark:bg-gray-900">
        <div className="flex min-h-screen bg-white antialiased dark:bg-gray-900 md:py-5">
          {/* Sidebar */}
          <aside className=" top-16 mt-12 left-0 w-full lg:w-1/4 bg-white border-gray-200 rounded-lg shadow dark:bg-gray-900 h-100 p-6 sm:p-8 md:p-10 lg:p-12">
            <Card className="dark:text-white mt-10 dark:bg-gray-800 p-6">
              <div className="flex flex-col items-center mb-5">
                <img
                  src={perfilInfo.image || "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"}
                  className="w-16 h-16 object-cover rounded-full ring-2 ring-gray-300"
                  alt="User Profile"
                />
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onChange={changeUploadImage}
                    className="mt-2 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 dark:border-gray-600"
                  />
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">Correo</label>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                  </svg>
                </div>
                <p>{perfilInfo.mail || "Ingresa un correo"}</p>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clip-rule="evenodd" />
                  </svg>
                </div>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={perfilInfo.name}
                    onChange={handleChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombre de usuario"
                    required
                  />
                ) : (
                  <p>{perfilInfo.name || "Nombre de usuario"}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección</label>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
                  </svg>
                </div>
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={perfilInfo.address}
                    onChange={handleChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Dirección de usuario"
                    required
                  />
                ) : (
                  <p>{perfilInfo.address || "Ingresa una dirección de envío"}</p>
                )}
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                  </svg>
                </div>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={perfilInfo.phone}
                    onChange={handleChange}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Teléfono de usuario"
                    required
                  />
                ) : (
                  <p>{perfilInfo.phone || "Ingresa un número de teléfono"}</p>
                )}
              </div>
              {editMode ? (
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Editar Perfil
                </button>
              )}
            </Card>
          </aside>
          <div className="flex flex-col w-full lg:w-3/4 p-6 sm:p-8 md:p-10 lg:p-12 ml-auto">
            <HistorialDePedidos />
            <br />
            <HistorialDeCompras />
          </div>
        </div>
      </div>
    </Flowbite>
  );
};

export default DashboardUser;
