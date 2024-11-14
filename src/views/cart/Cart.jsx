import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity, setCartItems } from '../../redux/actions/actions.js';
import { getMemoizedCartItems } from '../../redux/selectors/selectors';
import PayPalButton from '../../components/PayPalButton';
import { useFirebase } from '../../firebase/firebase.jsx';
import { useAuthState } from "react-firebase-hooks/auth";


const Cart = () => {
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const cartItems = useSelector(getMemoizedCartItems);
  const dispatch = useDispatch();


  //firebase
  const { auth } = useFirebase();
  const isAuthenticated = !!auth.currentUser;
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    if (user && user.email) {
      fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => {
          const matchingUser = data.find(u => u.mail === user.email);
          if (matchingUser) {
            setUserId(matchingUser.id_User);
          }
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [user]);



  const items = cartItems.map(item => ({
    id_Product: item.id_Product,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }));

  useEffect(() => {
    const restoreCartFromStorage = () => {
      const storedCartItems = isAuthenticated
        ? JSON.parse(localStorage.getItem('cartItems')) || []
        : JSON.parse(localStorage.getItem('cartItems')) || [];
      dispatch(setCartItems(storedCartItems));
    };

    restoreCartFromStorage();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const saveCartToStorage = () => {
      if (isAuthenticated) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } else {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    };

    saveCartToStorage();
  }, [cartItems, isAuthenticated]);

  useEffect(() => {
    const clearCartAndStorage = () => {
      if (!isAuthenticated) {
        //dispatch(setCartItems([]));
        //localStorage.removeItem('cartItems');
        //sessionStorage.removeItem('cartItem');
      }
    };

    clearCartAndStorage();
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const saveCartToSessionStorage = () => {
      if (isAuthenticated) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    };

    saveCartToSessionStorage();
  }, [cartItems, isAuthenticated]);

  const handleRemoveItemClick = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity, 10) || 1);
    dispatch(updateCartItemQuantity(itemId, quantity));
  };

  const handleIncrement = (itemId, currentQuantity) => {
    const newQuantity = parseInt(currentQuantity, 10) + 1;
    handleQuantityChange(itemId, newQuantity);
  };

  const handleDecrement = (itemId, currentQuantity) => {
    const newQuantity = Math.max(1, parseInt(currentQuantity, 10) - 1);
    handleQuantityChange(itemId, newQuantity);
  };

  const total = cartItems
    .map(item => parseFloat(item.price) * parseInt(item.quantity, 10))
    .reduce((acc, curr) => acc + curr, 0);


  const handleProceedToCheckout = async () => {
    setShowPayPalButton(true);

    if (isAuthenticated && userId) {
      try {
        const shoppingCart = cartItems;
        // Actualizar ítems del carrito del usuario en la base de datos
        const updateCartResponse = await fetch(`http://localhost:3001/users/put/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shoppingCart }),
        });

        if (!updateCartResponse.ok) {
          throw new Error('No se pudo actualizar los ítems del carrito del usuario');
        }

        // Actualizar cantidades de los productos en la base de datos
        // const updateProductsResponse = await fetch(`http://localhost:3001/products/${userId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ products: cartItems.map(item => ({ id_Product: item.id_Product, quantity: item.quantity })) }),
        // });

        // if (!updateProductsResponse.ok) {
        //     throw new Error('No se pudo actualizar las cantidades de los productos');
        // }

        // Crear una nueva orden en la base de datos
        // const createOrderResponse = await fetch(`http://localhost:3001/order/create-order/${userId}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ items, total }),
        // });

        // if (!createOrderResponse.ok) {
        //     throw new Error('No se pudo crear la orden');
        // }
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error durante el proceso de compra');
      }
    }
  };

  const [order, setOrder] = useState({
    id: '',
    intent: '',
    status: '',
    create_time: '',
    update_time: '',
    links: [
      {
        href: '',
        method: '',
        rel: ''
      }
    ],
    payer: {
      address: {
        country_code: ''
      },
      email_address: '',
      name: {
        given_name: '',
        surname: ''
      },
      payer_id: ''
    },
    purchase_units: [
      {
        amount: {
          currency_code: '',
          value: ''
        },
        payee: {
          email_address: '',
          merchant_id: ''
        },
        payments: {
          captures: [
            {
              amount: {
                currency_code: '',
                value: ''
              },
              create_time: '',
              final_capture: true,
              id: '',
              seller_protection: {
                status: '',
                dispute_categories: ['']
              },
              status: '',
              update_time: ''
            }
          ]
        },
        reference_id: '',
        shipping: {
          address: {
            address_line_1: '',
            admin_area_1: '',
            admin_area_2: '',
            country_code: '',
            postal_code: ''
          },
          name: {
            full_name: ''
          }
        },
        soft_descriptor: ''
      }
    ]
  });


  const handleSaveOrder = async (e) => {
    e.preventDefault();
    if (order.status === 'COMPLETED') {
      const parsedOrder = {
        ...order,
        id: '',
        intent: '',
        status: '',
        create_time: '',
        update_time: '',
        links: [
          {
            href: '',
            method: '',
            rel: ''
          }
        ],
        payer: {
          address: {
            country_code: ''
          },
          email_address: '',
          name: {
            given_name: '',
            surname: ''
          },
          payer_id: ''
        },
        purchase_units: [
          {
            amount: {
              currency_code: '',
              value: ''
            },
            payee: {
              email_address: '',
              merchant_id: ''
            },
            payments: {
              captures: [
                {
                  amount: {
                    currency_code: '',
                    value: ''
                  },
                  create_time: '',
                  final_capture: true,
                  id: '',
                  seller_protection: {
                    status: '',
                    dispute_categories: ['']
                  },
                  status: '',
                  update_time: ''
                }
              ]
            },
            reference_id: '',
            shipping: {
              address: {
                address_line_1: '',
                admin_area_1: '',
                admin_area_2: '',
                country_code: '',
                postal_code: ''
              },
              name: {
                full_name: ''
              }
            },
            soft_descriptor: ''
          }
        ]
      };
    }


    try {
      const response = await fetch('http://localhost:3001/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedOrder),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Puedes ver el estado de tu orden en la sección pedidos",
          showConfirmButton: true,
          confirmButtonText: "Seguir comprando",
          cancelButtonText: "Volver al Home",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // Seguir comprando
          } else {
            // Volver al Home
            setIsLoading(true);
            setTimeout(() => {
              navigate('/');
            }, 1500);
          }
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message || "Ooops algo no salió bien",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al guardar la orden",
      });
    }
  }

  return (
    <div className="pt-16">
      <div className="flex flex-col min-h-screen">
        <section className="flex-grow bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">Carrito de compras</h2>

            {cartItems?.length === 0 || !isAuthenticated ? (
              <div className="flex flex-col items-center justify-center mt-6 sm:mt-8">
                <img src="https://www.ancestralanimalsoul.com/imagenes/carrito-vacio.png" alt="Carrito vacío" className="mx-auto mb-4 h-48 w-48" />
                <p className="mt-6 sm:mt-8 text-2xl font-bold text-gray-500 dark:text-gray-400 text-center">El carrito está vacío</p>
                <Link to="/" className="mt-4 inline-block rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Seguir comprando
                </Link>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                  <ul className="space-y-6">
                    {cartItems.map((item, index) => (
                      <li key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <Link to={`/detail/${item.id_Product}`} className="shrink-0 md:order-1">
                            {item.image && (
                              <>
                                <img
                                  className="h-20 w-20 object-cover object-center" // Ajusta el tamaño de la imagen y la posición
                                  src={item.image[0]} // Accede a la primera imagen del arreglo
                                  alt={item.name}
                                />
                                <img
                                  className="h-20 w-20 hidden"
                                  src={item.darkImage && item.darkImage[0]} // Accede a la primera imagen del arreglo darkImage
                                  alt={item.name}
                                />
                              </>
                            )}
                          </Link>

                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                onClick={() => handleDecrement(item?.cartItemId, item?.quantity)}
                              >
                                <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                </svg>
                              </button>
                              <input
                                type="text"
                                id="counter-input"
                                data-input-counter
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                placeholder=""
                                value={item?.quantity || 1}
                                onChange={(e) => handleQuantityChange(item?.cartItemId, e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                onClick={() => handleIncrement(item?.cartItemId, item?.quantity)}
                              >
                                <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">${(item?.price * item?.quantity).toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <Link to={`/detail/${item?.id_Product}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item?.name}</Link>

                            <div className="flex items-center gap-4">
                              <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                              </button>
                              <div className="flex h-4 items-center border-l border-gray-300 dark:border-gray-600">
                                <button
                                  type="button"
                                  className="inline-flex items-center ps-4 text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                  onClick={() => handleRemoveItemClick(item?.cartItemId)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 md:mt-10 lg:sticky lg:top-36 lg:mt-0 w-full md:w-[280px] h-[200px]">
                  <div className="space-y-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Subtotal</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Envío</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">$0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-gray-900 dark:text-white">Total</span>
                      <span className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleProceedToCheckout}
                      className="min-w-[150px] w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 sm:text-base"
                    >
                      Pagar
                    </button>

                    {showPayPalButton && (
                      <div className="mt-6">
                        <PayPalButton total={total} items={items} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
