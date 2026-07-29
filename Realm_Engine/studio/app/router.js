/**
 * ============================================================
 * Realm Studio
 * Router
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Registers application routes.
 * - Opens Views inside the Workspace.
 * - Tracks the current route.
 * - Injects shared application services into Views.
 *
 * Must NOT know:
 * - Sidebar
 * - Toolbar
 * - Builders
 * - Project data
 * ============================================================
 */

export default class Router {

    constructor(workspace, services = {}) {

        this.workspace = workspace;

        this.services = services;

        this.routes = new Map();

        this.currentRoute = null;

    }

    register(name, ViewClass) {

        if (!name)
            throw new Error("Route name is required.");

        if (!ViewClass)
            throw new Error("ViewClass is required.");

        this.routes.set(name, ViewClass);

    }

    has(name) {

        return this.routes.has(name);

    }

    open(name) {

        if (!this.has(name)) {

            console.error(`Route '${name}' not found.`);

            return false;

        }

        const ViewClass = this.routes.get(name);

        const view = new ViewClass(this.services);

        this.workspace.setView(view);

        this.currentRoute = name;

        return true;

    }

    current() {

        return this.currentRoute;

    }

    getRoutes() {

        return [...this.routes.keys()];

    }

}