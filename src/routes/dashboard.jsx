import Dashboard from "views/Dashboard/Resume.jsx";
import InvoiceSearch from "views/Dashboard/Invoice/InvoiceSearch.jsx";
import InvoiceCreate from "views/Dashboard/Invoice/InvoiceCreate.jsx";

var dashboardRoutes = [
  {
    path: "/dashboard-resume",
    name: "Resumo",
    icon: "design_app",
    component: Dashboard
  },
  {
    collapse: true,
    path: "/dashboard/invoice",
    name: "Nota Fiscal",
    state: "openInvoice",
    icon: "education_agenda-bookmark",
    views: [
      {
        path: "/dashboard/invoice/create",
        name: "Cadastrar",
        mini: "CA",
        component: InvoiceCreate
      },
      {
        path: "/dashboard/invoice/search",
        name: "Pesquisar",
        mini: "PE",
        component: InvoiceSearch
      }
    ]
  }
];

export default dashboardRoutes;
