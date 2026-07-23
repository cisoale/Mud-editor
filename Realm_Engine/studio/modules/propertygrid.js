/**
 * ============================================================
 * Realm Studio
 * Property Grid
 * ============================================================
 *
 * Responsibilities
 * ----------------
 * - Displays editable properties.
 * - Creates PropertyField components.
 * - Binds schema fields to an object's values.
 *
 * Must NOT know:
 * - Entity
 * - Item
 * - Mob
 * - Room
 * - Repository
 * - SchemaLoader
 *
 * ============================================================
 */

import Component from "../framework/component.js";
import PropertyField from "../components/propertyfield.js";

export default class PropertyGrid extends Component {

    constructor() {

        super();

        this.schema = [];

        this.object = {};

        this.fields = [];

        this.changeCallback = null;

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement(
            "div",
            "property-grid"
        );

        this.refresh();

        return this.finishRender();

    }

    // ==========================================================
    // Schema
    // ==========================================================

    setSchema(schema) {

        this.schema = schema || [];

        this.refresh();

    }

    getSchema() {

        return this.schema;

    }

    // ==========================================================
    // Object
    // ==========================================================

    setObject(object) {

        this.object = object || {};

        this.refresh();

    }

    getObject() {

        return this.object;

    }

    // ==========================================================
    // Change callback
    // ==========================================================

    onChange(callback) {

        this.changeCallback = callback;

    }

    // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.element)
            return;

        this.element.replaceChildren();

        this.fields = [];

        if (!Array.isArray(this.schema))
            return;

        for (const fieldSchema of this.schema) {

            const field = new PropertyField(fieldSchema);

            const element = field.render();

            field.setValue(
                this.object[fieldSchema.id]
            );

            field.onChange(value => {

                this.object[fieldSchema.id] = value;

                if (this.changeCallback) {

                    this.changeCallback(fieldSchema.id, value);

                }

            });

            this.fields.push(field);

            this.element.appendChild(element);

        }

    }

    // ==========================================================
    // Utility
    // ==========================================================

    clear() {

        this.schema = [];

        this.object = {};

        this.fields = [];

        this.refresh();

    }

}