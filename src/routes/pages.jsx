import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterUser from "views/Pages/RegisterUser.jsx";

const pagesRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: "users_circle-08",
    component: LoginPage
  },
  {
    path: "/register-user",
    name: "Register User",
    short: "Register",
    mini: "RU",
    icon: "users_circle-08",
    component: RegisterUser
  },
  { redirect: true, path: "/", pathTo: "/login-page", name: "Login" }
];

export default pagesRoutes;
