
import React, { useState } from 'react';
import axios from 'axios';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import SignInButton from './authGoogle';

const signUpWithEmail = async (email, password, displayName) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Actualizar el perfil del usuario
    await updateProfile(user, { displayName });

    const token = await user.getIdToken();
    const userInfo = {
      mail: user.email,
      name: user.displayName,
      rol: true, // Puedes cambiar este valor si necesitas un rol específico
    };
    await sendUserInfoToBackend(userInfo, token);
  } catch (error) {
    console.error('Error signing up with email:', error);
  }
};

const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const token = await user.getIdToken();
    const userInfo = {
      mail: user.email,
      name: user.displayName,
      rol: true, // Puedes cambiar este valor si necesitas un rol específico
    };
    await sendUserInfoToBackend(userInfo, token);
  } catch (error) {
    console.error('Error signing in with email:', error);
  }
};

const sendUserInfoToBackend = async (userInfo, token) => {
  try {
    console.log('User Info:', userInfo); // Agregar un console.log para verificar userInfo
    console.log('Token:', token); // Agregar un console.log para verificar el token
    await axios.post('http://localhost:3001/users', userInfo, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error sending user info to backend:', error);
  }
};

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpWithEmail(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Nombre de usuario"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrarse
      </button>
    </form>
  );
};

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300"
      />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export { SignUpForm, SignInForm };
