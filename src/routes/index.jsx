import Pages from "layouts/Pages/Pages.jsx";
import Dashboard from "layouts/Dashboard/Dashboard";

var indexRoutes = [
  { path: "/dashboard-resume", name: "Dashboard Resumo", component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/", name: "Pages", component: Pages },
];

export default indexRoutes;