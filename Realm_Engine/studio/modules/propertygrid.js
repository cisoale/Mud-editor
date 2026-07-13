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
 * - Displays an object's values.
 *
 * Must NOT know:
 * - Items
 * - Mobs
 * - Rooms
 * - Repository
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

    }

    render() {

        this.element = this.createElement("div", "property-grid");

        this.refresh();

        return this.element;

    }

    setSchema(schema) {

        this.schema = schema;

        this.refresh();

    }

    setObject(object) {

        this.object = object || {};

        this.refresh();

    }

    clear() {

        this.schema = [];
        this.object = {};
        this.fields = [];

        this.refresh();

    }

    refresh() {

        if (!this.element)
            return;

        this.element.replaceChildren();

        this.fields = [];

        this.schema.forEach(fieldSchema => {

            const field = new PropertyField(fieldSchema);

            field.render();

            field.setValue(
                this.object[fieldSchema.id]
            );

            field.onChange(value => {

                this.object[fieldSchema.id] = value;

            });

            this.fields.push(field);

            this.element.appendChild(field.element);

        });

    }

    getObject() {

        return this.object;

    }

}