import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/home/HomePage";
import Contact from "./pages/Contact";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/Shipping";
import OrderConfirmedPage from "./pages/cart/OrderConfirmedPage";
import PaymentPage from "./pages/cart/PaymentPage";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import MyOrders from "./pages/myOrders/MyOrders";
import OrderDetails from "./pages/myOrders/OrderDetails";
import Dashboard from "./pages/admin/Dashboard";
import Lists from "./pages/admin/Lists";
import About from "./pages/about/About";
import NotFound from "./layout/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/UserAction";
import { Toaster } from "react-hot-toast";
import { getCartItemCount } from "./redux/actions/CartAction";
import EditProfile from "./pages/profile/EditProfile";
import ProductAction from "./pages/admin/ProductAction";
import "./styles/app.scss";


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(loadUser());
    dispatch({ type: "CLEAR_MSG" });
    dispatch({ type: "CLEAR_ERROR" });
    dispatch(getCartItemCount());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About detailed={true}/>} />

        <Route exact path="/cart" element={isAuthenticated ? <Cart /> : <Login type="login"/>} />
        <Route exact path="/shipping" element={isAuthenticated ? <Shipping /> : <Login />} />
        <Route exact path="/payment" element={isAuthenticated ? <PaymentPage /> : <Login />} />
        <Route exact path="/confirm" element={isAuthenticated ? <OrderConfirmedPage /> : <Login />} />

        <Route exact path="/login" element={isAuthenticated ? <Home /> : <Login type="login"/>} />
        <Route exact path="/signup" element={isAuthenticated ? <Home/> : <Login  type="signup"/>} />
        <Route exact path="/forgetpassword" element={isAuthenticated ? <Home/> : <Login  type="forget"/>} />
        <Route exact path="/resetpassword/:token" element={isAuthenticated ? <Home/> : <Login  type="reset"/>} />

        <Route exact path="/profile" element={isAuthenticated ? <Profile /> : <Login type="login"/>} />
        <Route exact path="/updateprofile" element={isAuthenticated ? <EditProfile /> : <Login type="login"/>} />

        <Route exact path="/myorders" element={isAuthenticated ? <MyOrders /> : <Login type="login"/>} />
        <Route exact path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <Login type="login"/>} />

        <Route exact path="/admin/dashboard" element={isAuthenticated ? user?.role === "admin" ? <Dashboard /> : <Navigate to="/profile" /> : <Navigate to="/login" />} />
        <Route exact path="/admin/users" element={isAuthenticated ? user?.role === "admin" ? <Lists type={"users"} /> : <Navigate to="/profile" /> : <Login type="login"/>} />
        <Route exact path="/admin/orders" element={isAuthenticated ? user?.role === "admin" ? <Lists type={"orders"} /> : <Navigate to="/profile" /> : <Login type="login"/>} />
        <Route exact path="/admin/product/new" element={isAuthenticated ? user?.role === "admin" ? <ProductAction /> : <Navigate to="/profile" /> : <Login type="login"/>} />
        <Route exact path="/admin/product/update/:id" element={isAuthenticated ? user?.role === "admin" ? <ProductAction type="update" /> : <Navigate to="/profile" /> : <Login type="login"/>} />
        <Route exact path="/admin/product/all" element={isAuthenticated ? user?.role === "admin" ? <Lists type={"products"} /> : <Navigate to="/profile" /> : <Login type="login"/>} />

        <Route exact path="*" element={<NotFound />} />

      </Routes>
      <Toaster position="top-center" />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
