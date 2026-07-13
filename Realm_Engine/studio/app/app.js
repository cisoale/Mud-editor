/**
 * ============================================================
 * Realm Studio
 * Application Entry Point
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Creates the application layout.
 * - Initializes the router.
 * - Registers application views.
 * - Connects Sidebar to Router.
 * - Opens the default view.
 *
 * ============================================================
 */

import Layout from "../framework/layout.js";
import Router from "./router.js";

import DashboardView from "../views/dashboard.js";
import PlaceholderView from "../views/placeholder.js";

// ------------------------------------------------------------
// Application
// ------------------------------------------------------------

const app = document.getElementById("app");

const layout = new Layout();

layout.render(app);

// ------------------------------------------------------------
// Router
// ------------------------------------------------------------

const router = new Router(layout.workspace);

// ------------------------------------------------------------
// Register Views
// ------------------------------------------------------------

router.register("dashboard", DashboardView);

import BrowserView from "../views/browser.js";

router.register("browser", BrowserView);

router.register(
    "items",
    class extends PlaceholderView {
        constructor() {
            super("Items");
        }
    }
);

router.register(
    "mobs",
    class extends PlaceholderView {
        constructor() {
            super("Mobs");
        }
    }
);

router.register(
    "rooms",
    class extends PlaceholderView {
        constructor() {
            super("Rooms");
        }
    }
);

router.register(
    "areas",
    class extends PlaceholderView {
        constructor() {
            super("Areas");
        }
    }
);

// ------------------------------------------------------------
// Sidebar Navigation
// ------------------------------------------------------------

layout.sidebar.onSelect((id) => {

    router.open(id);

});

// ------------------------------------------------------------
// Startup
// ------------------------------------------------------------

layout.sidebar.select("dashboard");