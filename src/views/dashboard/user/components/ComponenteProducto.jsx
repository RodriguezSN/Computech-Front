import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAllSales } from "../../../../redux/actions/actions";
import { auth } from "../../../../firebase/firebase";

const ComponenteProducto = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const allSales = useSelector((state) => state.allSales);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 flex flex-col gap-6 dark:bg-gray-800 dark:text-white w-full">
        <ul className="flex flex-col gap-6">
          {allSales
            .filter((order) => order.userInformation.emailLogin === user?.email)
            .map((order) => (
              <div key={order.id_Order} className="w-full">
                <div
                  key={order.id_Order}
                  className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg p-6 shadow-md flex justify-between items-center w-full"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="text-xl font-semibold">{order.id_Order}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{order.userInformation.emailLogin}</p>
                      <p className="text-gray-600 dark:text-gray-400">${order.paymentInformation.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponenteProducto;
