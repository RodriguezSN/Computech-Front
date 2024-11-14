import { useEffect, useState } from "react";
import { useFirebase } from "../../../../firebase/firebase"; // Importa el hook useFirebase

const Header = () => {
  const { auth } = useFirebase();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return <div className="text-gray-900 dark:text-white">Cargando...</div>;
  }

  return (
    <div className="pt-16">
    <header className="flex flex-col items-center justify-center text-center mb-4">
      <h1 className="text-2xl text-gray-600 dark:text-gray-100 md:text-3xl font-bold">
        Hola, <span>{user.displayName}</span>
      </h1>
    </header>
    </div>
  );
};

export default Header;
