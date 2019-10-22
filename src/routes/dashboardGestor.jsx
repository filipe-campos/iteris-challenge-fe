import Dashboard from "views/Dashboard/Resume.jsx";
import InvoiceAnticipation from "views/Dashboard/Invoice/InvoiceAnticipation";

var dashboardGestorRoutes = [
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
        path: "/dashboard/invoice/anticipation",
        name: "Antecipações",
        mini: "AN",
        component: InvoiceAnticipation
      }
    ]
  }
];

export default dashboardGestorRoutes;
