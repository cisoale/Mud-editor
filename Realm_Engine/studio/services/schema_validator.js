/**
 * ============================================================
 * Realm Studio
 * Schema Validator
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Validates Component Schemas.
 * - Reports validation errors.
 * - Reports validation warnings.
 *
 * Must NOT know:
 * - PropertyGrid
 * - Editor
 * - Browser
 * - Entity
 * - Repository
 *
 * ============================================================
 */

export default class SchemaValidator {

    constructor() {

        this.supportedTypes = [

            "string",
            "number",
            "integer",
            "float",
            "boolean",
            "textarea",
            "enum"

        ];

    }

    /**
     * Validate a component schema.
     */
    validate(schema) {

        const result = {

            valid: true,
            errors: [],
            warnings: []

        };

        if (!schema) {

            result.errors.push("Schema is null.");

            return this.finish(result);

        }

        //
        // Schema
        //

        if (!schema.id) {

            result.errors.push("Missing schema id.");

        }

        if (!schema.name) {

            result.errors.push("Missing schema name.");

        }

        if (!schema.description) {

            result.warnings.push("Missing schema description.");

        }

        if (!("version" in schema)) {

            result.warnings.push("Missing schema version.");

        }

        if (!Array.isArray(schema.fields)) {

            result.errors.push("Schema fields must be an array.");

            return this.finish(result);

        }

        //
        // Fields
        //

        const ids = new Set();

        schema.fields.forEach((field, index) => {

            this.validateField(field, index, ids, result);

        });

        return this.finish(result);

    }

    validateField(field, index, ids, result) {

        if (!field.id) {

            result.errors.push(
                `Field #${index} has no id.`
            );

            return;

        }

        if (ids.has(field.id)) {

            result.errors.push(
                `Duplicate field id '${field.id}'.`
            );

        }

        ids.add(field.id);

        if (!field.label) {

            result.errors.push(
                `Field '${field.id}' has no label.`
            );

        }

        if (!field.type) {

            result.errors.push(
                `Field '${field.id}' has no type.`
            );

            return;

        }

        if (!this.supportedTypes.includes(field.type)) {

            result.errors.push(
                `Unsupported type '${field.type}' in field '${field.id}'.`
            );

        }

        //
        // Enum
        //

        if (field.type === "enum") {

            if (!Array.isArray(field.values)) {

                result.errors.push(
                    `Enum '${field.id}' has no values array.`
                );

            }

            else if (field.values.length === 0) {

                result.errors.push(
                    `Enum '${field.id}' contains no values.`
                );

            }

        }

    }

    finish(result) {

        result.valid = result.errors.length === 0;

        return result;

    }

}