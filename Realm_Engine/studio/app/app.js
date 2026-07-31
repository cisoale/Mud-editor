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
import Application from "../core/application.js";

const app = new Application();

await app.start();