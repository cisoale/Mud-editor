import Layout from "../framework/layout.js";
import Router from "./router.js";
import DashboardView from "../views/dashboard.js";

const app = document.getElementById("app");

const layout = new Layout();

layout.render(app);

const router = new Router(layout.workspace);

router.register("dashboard", DashboardView);

router.open("dashboard");