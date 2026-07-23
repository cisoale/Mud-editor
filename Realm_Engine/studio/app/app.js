/**
 * ============================================================
 * Realm Studio
 * Application Entry Point
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Creates the application layout.
 * - Initializes application services.
 * - Initializes the router.
 * - Registers application views.
 * - Connects Sidebar to Router.
 * - Opens the default view.
 *
 * ============================================================
 */

import Layout from "../framework/layout.js";
import Router from "./router.js";

import SchemaLoader from "../services/schema_loader.js";
import EntityRepository from "../repositories/entity_repository.js";

import DashboardView from "../views/dashboard.js";
import PlaceholderView from "../views/placeholder.js";
import BrowserView from "../views/browser.js";

// ------------------------------------------------------------
// Initialize Services
// ------------------------------------------------------------

const schemaLoader = new SchemaLoader();

try {

    await schemaLoader.load();

    console.info(
        `[App] ${schemaLoader.count()} schemas loaded.`
    );

    console.table(
        schemaLoader.getAll()
    );

}
catch (error) {

    console.error("[App] Failed to load schemas.");

    console.error(error);

}

// ------------------------------------------------------------
// Shared Services
// ------------------------------------------------------------

const services = {

    schemaLoader,

    entityRepository: new EntityRepository()

};

// ------------------------------------------------------------
// Application
// ------------------------------------------------------------

const app = document.getElementById("app");

const layout = new Layout();

layout.render(app);

// ------------------------------------------------------------
// Router
// ------------------------------------------------------------

const router = new Router(
    layout.workspace,
    services
);

// ------------------------------------------------------------
// Register Views
// ------------------------------------------------------------

router.register(
    "dashboard",
    DashboardView
);

router.register(
    "browser",
    BrowserView
);

router.register(
    "items",
    class extends PlaceholderView {

        constructor(services) {

            super("Items");

            this.services = services;

        }

    }
);

router.register(
    "mobs",
    class extends PlaceholderView {

        constructor(services) {

            super("Mobs");

            this.services = services;

        }

    }
);

router.register(
    "rooms",
    class extends PlaceholderView {

        constructor(services) {

            super("Rooms");

            this.services = services;

        }

    }
);

router.register(
    "areas",
    class extends PlaceholderView {

        constructor(services) {

            super("Areas");

            this.services = services;

        }

    }
);

// ------------------------------------------------------------
// Sidebar Navigation
// ------------------------------------------------------------

layout.sidebar.onSelect(id => {

    router.open(id);

});

// ------------------------------------------------------------
// Startup
// ------------------------------------------------------------

layout.sidebar.select("dashboard");