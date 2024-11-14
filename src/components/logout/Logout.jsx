import React from "react";
import { useAuth } from "react-firebase-hooks/auth";
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions/actions';
import { auth } from "./firebase";


const LogoutButton = () => {
    const { logout } = useAuth(auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('cartItems');
        sessionStorage.removeItem('cartItems');
        dispatch(setCartItems([]));  // Clear cart in Redux store
        logout({ returnTo: window.location.origin });
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;









