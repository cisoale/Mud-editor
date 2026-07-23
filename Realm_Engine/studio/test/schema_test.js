import SchemaLoader from "../services/schema_loader.js";

const loader = new SchemaLoader();

await loader.load();

console.group("Schema Loader");

console.log("Count:", loader.count());
console.log("Ids:", loader.getIds());
console.log("Schemas:", loader.getAll());

console.groupEnd();