/**
 * ============================================================
 * Realm Studio
 * Generic Repository
 * ============================================================
 */

export default class Repository {

    constructor(schema = [], data = []) {

        this.schema = schema;
        this.items = data;

    }

    getAll() {

        return this.items;

    }

    getById(id) {

        return this.items.find(item => item.id === id);

    }

    nextId() {

        if (this.items.length === 0)
            return 1000;

        return Math.max(...this.items.map(i => i.id)) + 1;

    }

    create() {

        const object = {};

        this.schema.forEach(field => {

            object[field.id] = field.default;

        });

        object.id = this.nextId();

        this.items.push(object);

        return object;

    }

    remove(object) {

        const index = this.items.indexOf(object);

        if (index >= 0) {

            this.items.splice(index, 1);

        }

    }

    duplicate(object) {

        const copy = structuredClone(object);

        copy.id = this.nextId();

        if (copy.name) {

            copy.name += " Copy";

        }

        this.items.push(copy);

        return copy;

    }

}