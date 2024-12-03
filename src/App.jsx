import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./screen/product/AddProduct";

const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const Layout = lazy(() => import("./screen/Layout"));
const DashboardScreen = lazy(() =>
  import("./screen/dashboard/DashboardScreen")
);
const ProductScreen = lazy(() => import("./screen/product/ProductScreen"));
const Profile = lazy(() => import("./screen/profile/Profile"));
const EditProfile = lazy(() => import("./screen/profile/EditProfile"));

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const onLogin = () => {
    setIsLogin(true);
  };

  if (!isLogin) {
    return (
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="animate-pulse">LOADING BOSS</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="/product" element={<ProductScreen />} />
          <Route path="/product/add" element={<AddProduct/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
