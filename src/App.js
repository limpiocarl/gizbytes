//import
import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";

//import pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ProductsPage from "./pages/Products";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/AdminProducts";
import AdminUpdateProduct from "./pages/AdminUpdateProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

//import components
import BannerTop from "./components/BannerTop";
import Navbar from "./components/AppNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    firstName: null,
    lastName: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch("https://glacial-woodland-05160.herokuapp.com/users/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.id !== "undefined") {
          setUser({
            id: data.id,
            isAdmin: data.isAdmin,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
            firstName: null,
            lastName: null,
            email: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        {user.isAdmin ? (
          <AdminNavbar />
        ) : (
          <Fragment>
            <BannerTop /> <Navbar />
          </Fragment>
        )}
        <Container>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/registerAdmin" element={<RegisterAdmin />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/products/:productId" element={<Product />} />
            <Route exact path="/products" element={<ProductsPage />} />
            <Route exact path="/user" element={<Profile />} />
            <Route exact path="*" element={<NotFound />} />
            <Route exact path="/adminProducts" element={<AdminProducts />} />
            <Route
              exact
              path="/adminProducts/:productId"
              element={<AdminUpdateProduct />}
            />
            <Route exact path="/adminOrders" element={<AdminOrders />} />
            <Route exact path="/adminUsers" element={<AdminUsers />} />
          </Routes>
        </Container>
        {/* <Footer /> */}
      </Router>
    </UserProvider>
  );
}

export default App;
