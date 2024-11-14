import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions/actions';
import { useFirebase } from '../../firebase/firebase.jsx'; 
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const LoginButton = () => {
    const { auth, googleProvider } = useFirebase();
    const dispatch = useDispatch();

    useEffect(() => {
        const restoreCartItems = () => {
            const storedSessionCartItems = JSON.parse(sessionStorage.getItem('cartItems'));
            if (storedSessionCartItems) {
                dispatch(setCartItems(storedSessionCartItems));
            } else {
                const storedLocalCartItems = JSON.parse(localStorage.getItem('cartItems'));
                if (storedLocalCartItems) {
                    dispatch(setCartItems(storedLocalCartItems));
                    sessionStorage.setItem('cartItems', JSON.stringify(storedLocalCartItems));
                }
            }
        };

        restoreCartItems();
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                const storedLocalCartItems = JSON.parse(localStorage.getItem('cartItems'));
                if (storedLocalCartItems) {
                    dispatch(setCartItems(storedLocalCartItems));
                    sessionStorage.setItem('cartItems', JSON.stringify(storedLocalCartItems));
                }
            }
        });

        return () => unsubscribe();
    }, [auth, dispatch]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error during login: ", error);
        }
    };

    return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;












