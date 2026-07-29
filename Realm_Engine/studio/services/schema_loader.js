/**
 * ============================================================
 * Realm Studio
 * Schema Loader
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Loads component schemas.
 * - Validates schemas.
 * - Caches schemas.
 *
 * Must NOT know:
 * - PropertyGrid
 * - Browser
 * - Editor
 * - Entity
 *
 * ============================================================
 */

import SchemaValidator from "./schema_validator.js";

export default class SchemaLoader {

    constructor() {

        this.schemas = new Map();

        this.validator = new SchemaValidator();

    }

    /**
     * Register schema.
     */
    register(schema) {

        const result = this.validator.validate(schema);

        if (!result.valid) {

            console.error(
                `[SchemaLoader] Invalid schema '${schema?.id ?? "unknown"}'`
            );

            console.table(result.errors);

            return false;

        }

        if (result.warnings.length > 0) {

            console.warn(

                `[SchemaLoader] Warnings for '${schema.id}'`

            );

            console.table(result.warnings);

        }

        this.schemas.set(schema.id, schema);

        return true;

    }

    /**
     * Returns schema by id.
     */
    get(id) {

        return this.schemas.get(id) ?? null;

    }

    /**
     * Returns true if schema exists.
     */
    has(id) {

        return this.schemas.has(id);

    }

    /**
     * Returns all schemas.
     */
    getAll() {

        return [...this.schemas.values()];

    }

    /**
     * Returns schema count.
     */
    count() {

        return this.schemas.size;

    }

    /**
     * Clears cache.
     */
    clear() {

        this.schemas.clear();

    }


    async loadRegistry() {

        const response = await fetch("./schemas/component_registry.json");

        if (!response.ok) {

            throw new Error("Unable to load component registry.");

        }

        return await response.json();

    }

    async loadSchema(path) {

        const response = await fetch(`./schemas/${path}`);

        if (!response.ok) {

            throw new Error(`Unable to load schema '${path}'`);

        }

        return await response.json();

    }
    async load() {

        this.clear();

        const registry = await this.loadRegistry();

        for (const component of registry.components) {

            try {

                const schema = await this.loadSchema(component.path);

                this.register(schema);

            }

            catch (error) {

                console.error(error);

            }

        }

        console.info(

            `[SchemaLoader] Loaded ${this.count()} schemas.`

        );

    }
}