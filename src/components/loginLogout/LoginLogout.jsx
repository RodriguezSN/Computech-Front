import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import SignInButton from "../../firebase/authGoogle";
import { SignUpForm, SignInForm } from "../../firebase/authManual";
import Perfil from "../../views/dashboard/user/components/Perfil";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/actions";
import AccountLocked from "../../components/accountLocked/AccountLocked";

const LoginLogout = () => {
  const [user] = useAuthState(auth);
  const [isRegistering, setIsRegistering] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const allUsers = useSelector((state) => state.allUsers);

  let currentUser = null;
  allUsers.forEach((u) => {
    if (user?.email === u.mail) {
      currentUser = u;
    }
  });

  const openProfileModal = () => {
    setIsModalProfileOpen(true);
  };

  const closeProfileModal = () => {
    setIsModalProfileOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (currentUser && currentUser.active === false) {
    return <AccountLocked />;
  }

  return (
    <li className="relative content-center">
      {!user ? (
        <div>
          <button
            type="button"
            className="block py-2 px-3 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:md:hover:text-blue-500 md:p-0"
            onClick={openModal}
          >
            Iniciar Sesión
          </button>
          {modalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 dark:bg-gray-800 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Iniciar Sesión
                      </h3>
                      <div className="mt-2">
                        {!isRegistering ? (
                          <>
                            <SignInForm />
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              ¿No tienes una cuenta?{" "}
                              <button
                                onClick={() => setIsRegistering(true)}
                                className="text-blue-500 dark:text-blue-400 hover:underline"
                              >
                                Regístrate
                              </button>
                            </p>
                            <SignInButton />
                          </>
                        ) : (
                          <>
                            <SignUpForm />
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              ¿Ya tienes una cuenta?{" "}
                              <button
                                onClick={() => setIsRegistering(false)}
                                className="text-blue-500 dark:text-blue-400 hover:underline"
                              >
                                Inicia Sesión
                              </button>
                            </p>
                            <SignInButton />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="flex items-center justify-center w-full rounded-md px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              <img
                src={currentUser?.image}
                alt={currentUser?.name}
                className="h-8 w-8 rounded-full mr-2"
              />
              Hola, {currentUser?.name}
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {currentUser?.rol ? (
                  <a
                    href="/dashboardadmin/manage/products"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Administrador
                  </a>
                ) : (
                  <a
                    href="http://localhost:5173/dashboarduser"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Usuario
                  </a>
                )}
                <a
                  onClick={openProfileModal}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal"
                >
                  Perfil
                </a>
                <Perfil
                  currentUser={currentUser}
                  isOpen={isModalProfileOpen}
                  onClose={closeProfileModal}
                />
                <a
                  href="/account-settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Configuración de Cuenta
                </a>
                <a
                  href="/order-history"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Historial de Pedidos
                </a>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={() => auth.signOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default LoginLogout;
