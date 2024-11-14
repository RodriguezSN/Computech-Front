import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Cart from "./views/cart/Cart";
import Form from "./components/form/Form";
import Detail from "./views/detail/Detail";
import About from "./views/about/About";
import ProductDisplay from "./views/reviews/reviews";
import DashboardUser2 from "./views/dashboard/user/DashboardUser2";
import DashboardAdmin from "./views/dashboard/admin/DashboardAdmin";
import DashboardAdminManageUsers from "./views/dashboard/admin/DashboardAdminManageUsers";
import { FirebaseProvider } from "./firebase/firebase"; // Asegúrate de importar correctamente FirebaseProvider
import OrderDetail from "./views/orderdetail/OrderDetail";
import AdminReviews from "../src/components/adminReviews/AdminReviews";
import AccountLocked from "../src/components/accountLocked/AccountLocked";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./redux/actions/actions";

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  let currentUser = null;
  allUsers.forEach((u) => {
    if (user?.email === u.mail) {
      currentUser = u;
    }
  });

  useEffect(() => {
    if (currentUser && currentUser.active === false) {
      navigate("/blocked");
    }
  }, [currentUser, navigate]);

  return (
    <FirebaseProvider>
      <>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
          <Route path="/form" element={<><Navbar /><Form /><Footer /></>} />
          <Route path="/detail/:id" element={<><Navbar /><Detail /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/ProductDisplay" element={<><Navbar /><ProductDisplay /><Footer /></>} />
          <Route path="/dashboardadmin/manage/reviews" element={<><Navbar /><AdminReviews /><Footer /></>} />
          <Route path="/dashboardadmin/manage/products" element={<><Navbar /><DashboardAdmin /><Footer /></>} />
          <Route path="/dashboardadmin/manage/users" element={<><Navbar /><DashboardAdminManageUsers /><Footer /></>} />
          <Route path="/dashboarduser" element={<><Navbar /><DashboardUser2 /><Footer /></>} />
          <Route path="/dashboardadmin/manage/products/orderdetail" element={<><Navbar /><OrderDetail /><Footer /></>} />
          <Route path="/blocked" element={<AccountLocked />} />
        </Routes>
      </>
    </FirebaseProvider>
  );
}

export default App;
