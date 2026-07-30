/**
 * ============================================================
 * Realm Studio
 * Application
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Bootstraps the application.
 * - Creates shared services.
 * - Creates the application layout.
 * - Creates the router.
 * - Registers application views.
 * - Starts the application.
 *
 * Must NOT know:
 * ----------------
 * - Entities
 * - Items
 * - Mobs
 * - Rooms
 * - Editors
 * - UI business logic
 *
 * Collaborates with:
 * ----------------
 * - ServiceContainer
 * - Layout
 * - Router
 * - Project (future)
 * - Session (future)
 *
 * Maturity:
 * ----------------
 * Level B
 * ============================================================
 */

import ServiceContainer from "./service_container.js";

import SchemaLoader from "../services/schema_loader.js";
import EntityRepository from "../repositories/entity_repository.js";



export default class Application {

    constructor() {

        this.services = null;
        this.layout = null;
        this.router = null;

    }

    async start() {

        await this.initializeServices();

        this.createLayout();

        this.createRouter();

        this.registerViews();

        this.connectSidebar();

        this.openDefaultView();

    }

    stop() {

        // Future

    }

    async initializeServices() {

    this.services = new ServiceContainer();

    const schemaLoader = new SchemaLoader();

    try {

        await schemaLoader.load();

        console.info(
            `[Application] ${schemaLoader.count()} schemas loaded.`
        );

        console.table(
            schemaLoader.getAll()
        );

    }
    catch (error) {

        console.error(
            "[Application] Failed to load schemas."
        );

        console.error(error);

    }

    this.services.register(
        "schemaLoader",
        schemaLoader
    );

    this.services.register(
        "entityRepository",
        new EntityRepository()
    );

}

}