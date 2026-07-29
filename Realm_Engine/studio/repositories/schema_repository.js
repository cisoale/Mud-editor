export default class SchemaRepository {

    constructor() {

        this.schemas = new Map();

    }

    add(schema) {

        this.schemas.set(schema.id, schema);

    }

    get(id) {

        return this.schemas.get(id) ?? null;

    }

    has(id) {

        return this.schemas.has(id);

    }

    remove(id) {

        this.schemas.delete(id);

    }

    clear() {

        this.schemas.clear();

    }

    getAll() {

        return [...this.schemas.values()];

    }

    getIds() {

        return [...this.schemas.keys()];

    }

    count() {

        return this.schemas.size;

    }

}