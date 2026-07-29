import SchemaLoader from "./schema_loader.js";

class ServiceContainer {

    constructor() {

        this.schemaLoader = new SchemaLoader();

    }

    async initialize() {

        await this.schemaLoader.load();

    }

}

export default new ServiceContainer();