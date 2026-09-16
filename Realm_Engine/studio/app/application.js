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
 * ============================================================
 */

import ServiceContainer from "./service_container.js";
import Layout from "./layout.js";
import Router from "./router.js";

import SchemaLoader from "../services/schema_loader.js";
import EntityRepository from "../repositories/entity_repository.js";
import FileService from "../services/file_service.js";

import DashboardView from "../views/dashboard.js";
import BrowserView from "../views/browser.js";
import PlaceholderView from "../views/placeholder.js";

import Project from "./project.js";
import RealmContext from "./realm_context.js";

export default class Application {

    constructor() {

        this.context = new RealmContext();
        this.layout = null;
        this.router = null;
        
        window.realmApplication = this;

    }

    async start() {

    await this.initializeServices();

    this.createProject();

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

        this.context.services = new ServiceContainer();

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

        this.context.services.register(
            "schemaLoader",
            schemaLoader
        );

        this.context.services.register(
            "fileService",
            new FileService()
        );

        const fileService = this.context.services.get("fileService");

        let entityData = null;

        try {

            const projectData =
                await fileService.load("data/project.json");

            entityData =
                projectData.repositories?.entities ?? null;

            console.info("[Application] Project data loaded.");

        }
        catch (error) {

            console.info(
                "[Application] No saved project found. Using defaults."
            );

        }

        this.context.services.register(
            "entityRepository",
            new EntityRepository(entityData)
        );

    }

    createLayout() {

        const app = document.getElementById("app");

        this.layout = new Layout();

        this.layout.render(app);

    }

    createRouter() {

        this.router = new Router(
            this.layout.workspace,
            this.context
        );

    }

    registerViews() {

        this.router.register(
            "dashboard",
            DashboardView
        );

        this.router.register(
            "browser",
            BrowserView
        );

        this.router.register(
            "items",
            class extends PlaceholderView {

                constructor(services) {

                    super("Items");

                    this.services = services;

                }

            }
        );

        this.router.register(
            "mobs",
            class extends PlaceholderView {

                constructor(services) {

                    super("Mobs");

                    this.services = services;

                }

            }
        );

        this.router.register(
            "rooms",
            class extends PlaceholderView {

                constructor(services) {

                    super("Rooms");

                    this.services = services;

                }

            }
        );

        this.router.register(
            "areas",
            class extends PlaceholderView {

                constructor(services) {

                    super("Areas");

                    this.services = services;

                }

            }
        );

    }

    connectSidebar() {

        this.layout.sidebar.onSelect(id => {

            this.router.open(id);

        });

    }

    openDefaultView() {

        this.layout.sidebar.select("dashboard");

    }
createProject() {

    this.context.project = new Project();

    this.context.project.fileService =
        this.context.services.get("fileService");

    this.context.project.registerRepository(
        "entities",
        this.context.services.get("entityRepository")
    );

}
}