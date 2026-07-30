/**
 * ============================================================
 * Realm Studio
 * Service Container
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Registers shared services.
 * - Resolves services.
 * - Checks service existence.
 * - Removes registered services.
 *
 * Must NOT know:
 * ----------------
 * - Router
 * - Views
 * - Plugins
 * - Entities
 * - UI
 *
 * Collaborates with:
 * ----------------
 * - Application
 * - Project
 * - Session
 *
 * Maturity:
 * ----------------
 * Level A
 * ============================================================
 */

export default class ServiceContainer {

    constructor() {

        this.services = new Map();

    }

    /**
     * Register a service.
     */
    register(id, service) {

        if (!id)
            throw new Error("Service id is required.");

        if (this.services.has(id))
            throw new Error(`Service '${id}' is already registered.`);

        this.services.set(id, service);

    }

    /**
     * Resolve a service.
     */
    get(id) {

        if (!this.services.has(id))
            throw new Error(`Service '${id}' is not registered.`);

        return this.services.get(id);

    }

    /**
     * Check if service exists.
     */
    has(id) {

        return this.services.has(id);

    }

    /**
     * Remove a service.
     */
    remove(id) {

        return this.services.delete(id);

    }

    /**
     * Remove all services.
     */
    clear() {

        this.services.clear();

    }

    /**
     * Number of registered services.
     */
    count() {

        return this.services.size;

    }

    /**
     * Returns registered service ids.
     */
    keys() {

        return [...this.services.keys()];

    }

}