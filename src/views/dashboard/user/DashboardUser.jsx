// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFirebase } from "../../../firebase/firebase"; 

// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import HistorialDePedidos from "./components/HistorialDePedidos";
// import HistorialDeCompras from './components/HistorialDeCompras'
// import Novedades from './components/Novedades'
// import Cargando from './components/Cargando'



// const DashboardUser = () => {
//   const { auth } = useFirebase();
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate(); 



//   console.log('user',user)
//   console.log('auth',auth)

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         setIsLoading(false);
//       } else {
//         navigate('/login'); // Utiliza navigate en lugar de history.push
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Puedes mostrar un spinner de carga mientras se verifica la autenticación
//   }

//   return(
//     <div className="pt-16">
//     <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 min-h-screen dark:bg-gray-900 md:py-5">
//       <Sidebar/>
//       <main className="col-span-1 lg:col-span-3 md:p-8 xl:col-span-5 dark:bg-gray-900 p-8">
//         <Header/>
//         {/* Section 1 */}
//         <section className="grid sm:grid-cols-1 sm:col-span-1 lg:col-span-3 xl:col-span-5 dark:bg-gray-900 p-4 md:p-8 gap-4 py-2 flex-grow">
//           {/* Historial de pedidos */}
//           <HistorialDePedidos className="sm:col-span-1 lg:cols-span-3"/>
//           <HistorialDeCompras className="sm:col-span-1 lg:cols-span-3 cols-span-6" />

//         </section>
//       </main>
//           {<Novedades className="sm:col-span-1 lg:cols-span-3" />}
//     </div>
//     </div>
//   );

// };

// export default DashboardUser

import React from 'react'
import SideBarAdmin from '../../../components/sidebaradmin/SideBarAdmin'
// import { ChartCategories } from '../../../components/charts/ChartCategories';
import { Chart } from '../../../components/charts/ChartProductStock'
import { DangerCard } from '../../../components/dangercard/DangerCard';
import Sidebar from './components/Sidebar';

const DashboardUser = () => {
  
  return (
    <div className="pt-16">
      <div className="flex min-h-screen bg-white antialiased dark:bg-gray-800 md:py-5">
        {/* Sidebar */}
        
        {/* <SideBarAdminResponsive></SideBarAdminResponsive> */}
        <div>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
           
          </div>
          <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            <div className='col-span-2 mt-10'>
              
            </div>
            <div className='col-span-2 mt-10 px-7'>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardUser
