/**
 * ============================================================
 * Realm Studio
 * Project
 * ============================================================
 *
 * Represents an opened Realm Studio project.
 *
 * Responsibilities
 * ----------------
 * - Owns repositories.
 * - Stores project metadata.
 * - Tracks dirty state.
 * - Stores project path.
 *
 * Must NOT know:
 * ----------------
 * - UI
 * - Views
 * - Panels
 * - Editors
 * - Router
 *
 * ============================================================
 */

export default class Project {

    constructor() {

        this.name = "";

        this.path = "";

        this.version = 1;

        this.repositories = new Map();

        this.metadata = new Map();

        this.dirty = false;

    }

    registerRepository(name, repository) {

        this.repositories.set(name, repository);

    }

    getRepository(name) {

        return this.repositories.get(name);

    }

    hasRepository(name) {

        return this.repositories.has(name);

    }

    removeRepository(name) {

        this.repositories.delete(name);

    }

    getRepositories() {

        return this.repositories;

    }

    setMetadata(key, value) {

        this.metadata.set(key, value);

    }

    getMetadata(key) {

        return this.metadata.get(key);

    }

    hasMetadata(key) {

        return this.metadata.has(key);

    }

    isDirty() {

        return this.dirty;

    }

    setDirty(value = true) {

        this.dirty = value;

    }

    clearDirty() {

        this.dirty = false;

    }

}