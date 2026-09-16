/**
 * ============================================================
 * Realm Studio
 * Generic Repository
 * ============================================================
 *
 * Base repository used by all entity repositories.
 * It only manages a collection of entities.
 * ============================================================
 */

export default class Repository {

    constructor(data = []) {

        this.items = data;

    }

    // ==========================================================
    // Query
    // ==========================================================

    getAll() {

        return [...this.items];

    }

    getById(id) {

        return this.items.find(item => item.id === id);

    }
    exists(id) {

    return this.items.some(item => item.id === id);

    }

   

    find(predicate) {

    return this.items.find(predicate);

    }

    filter(predicate) {

    return this.items.filter(predicate);

    }
    // ==========================================================
    // Dirty State
    // ==========================================================

    getDirty() {

        return this.items.filter(entity =>
            entity.meta?.dirty === true
        );

    }

    markDirty(entity) {

        if (entity?.meta) {

            entity.meta.dirty = true;

        }

    }

    clearDirty(entity) {

        if (entity?.meta) {

            entity.meta.dirty = false;

        }

    }

    clearAllDirty() {

        for (const entity of this.items) {

            this.clearDirty(entity);

        }

    }

    // ==========================================================
    // IDs
    // ==========================================================

    nextId() {

        if (this.items.length === 0)
            return 1000;

        return Math.max(...this.items.map(i => i.id)) + 1;

    }

    // ==========================================================
    // CRUD
    // ==========================================================

    create(data = {}) {

        const entity = this.createDefault();

        Object.assign(entity, structuredClone(data));

         this.items.push(entity);

        return entity;

    }
    createDefault() {

    return {

        id: this.nextId()

    };

    }
    remove(entity) {

        const index = this.items.indexOf(entity);

        if (index !== -1) {

            this.items.splice(index, 1);

        }

    }

    removeById(id) {

    const index = this.items.findIndex(
        item => item.id === id
    );

    if (index !== -1) {

        this.items.splice(index, 1);

        return true;

    }

    return false;

    }

    update(id, data = {}) {

    const entity = this.getById(id);

    if (!entity)
        return null;

    Object.assign(entity, structuredClone(data));

    this.markDirty(entity);

    return entity;

    }

    duplicate(entity) {

        const copy = structuredClone(entity);

        copy.id = this.nextId();

        const identity = copy.components?.["core.identity"];

        if (identity?.name) {

            identity.name += " Copy";

        }

        this.items.push(copy);

        return copy;

    }

    clear() {

        this.items.length = 0;

    }

}