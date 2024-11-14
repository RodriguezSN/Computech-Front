import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyARKII_-ZRbbhXP3--TdeH4JIgRErz9F3U",
  authDomain: "computech-log.firebaseapp.com",
  projectId: "computech-log",
  storageBucket: "computech-log.appspot.com",
  messagingSenderId: "1095527705323",
  appId: "1:1095527705323:web:dadcbebc67d49ef9292cae",
  measurementId: "G-XL46QPYWW2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén la instancia de auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Crea un contexto para Firebase
const FirebaseContext = createContext({ app, auth, googleProvider });

// Hook para consumir el contexto
export const useFirebase = () => useContext(FirebaseContext);

// Proveedor para envolver la aplicación con el contexto de Firebase
export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, auth, googleProvider }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Exporta auth, googleProvider, signInWithEmailAndPassword y createUserWithEmailAndPassword
export { auth, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword };