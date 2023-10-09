import React from "react";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import ForgotPassword from "../pages/auth/forgotpassword/ForgotPassword";
import NotFound from "../pages/notFound/NotFound";
import Verify from "../pages/auth/verify/Verify";
const privateRoutes = [{ path: "/", component: Home }];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgot-password/", component: ForgotPassword },
  { path: "/forgot-password/:uuid", component: ForgotPassword },
  { path: "/verify/:uuid", component: Verify },
];

const notFoundRoute = { path: "*", component: NotFound };
export { privateRoutes, publicRoutes, notFoundRoute };
