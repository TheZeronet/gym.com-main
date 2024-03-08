import { Route, Routes } from "react-router-dom";
import Cart from "../Cart";
import LandingPage from "../pages/monu/pages/LandingPage";
import OrderSuccessfull from "../pages/monu/pages/OrderSuccessfull";
import PaymentForm from "../pages/monu/pages/PaymentForm";
import AccessoryPage from "../pages/nayan/pages/AccessoryPage";
import ProductPage from "../pages/nayan/pages/ProductPage";
import Wishlist from "../pages/nayan/pages/Wishlist";
import SingleProductPage from "../pages/nayan/pages/SingleProductPage";
import UserDashboard from "../pages/nayan/pages/UserDashboard";
import Login from "../pages/Shrikrishna/pages/Login";
import SignUp from "../pages/Shrikrishna/pages/SignUp";
import AdminDashbord from "../pages/sufiyan/pages/AdminDashbord";
import AddProduct from "../pages/sufiyan/pages/nestedPages/AddProduct";
import AllUsers from "../pages/sufiyan/pages/nestedPages/AllUsers";
import Dashborad from "../pages/sufiyan/pages/nestedPages/Dashborad";
import AdminPrivateAuth from "./AdminPrivateRoute";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/monu/pages/About";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/coach" element={<AccessoryPage />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:producerID" element={<SingleProductPage />} />

        <Route
          path="/checkout/payment"
          element={
            <PrivateRoute>
              <PaymentForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/OrderSuccessfull"
          element={
            <PrivateRoute>
              <OrderSuccessfull />
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />

        <Route path="/user-profile" element={<UserDashboard />} />

        <Route path="/about" element={<About />} />

        {/*////////////////////////////////////////////////////*/}

        <Route path="/admin" element={<AdminDashbord />}>
          <Route
            index
            element={
              <AdminPrivateAuth>
                <Dashborad />{" "}
              </AdminPrivateAuth>
            }
          />
          <Route
            exact
            path="dashboard"
            element={
              <AdminPrivateAuth>
                <Dashborad />{" "}
              </AdminPrivateAuth>
            }
          />

          <Route
            exact
            path="add-product"
            element={
              <AdminPrivateAuth>
                <AddProduct />{" "}
              </AdminPrivateAuth>
            }
          />
          <Route
            exact
            path="all-users"
            element={
              <AdminPrivateAuth>
                <AllUsers />{" "}
              </AdminPrivateAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
