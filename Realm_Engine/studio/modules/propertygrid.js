/**
 * ============================================================
 * Realm Studio
 * Property Grid
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

    //
    // Schema
    //

    setSchema(schema) {

        this.schema = schema || [];

        this.refresh();

    }

    //
    // Object
    //

    setObject(object) {

        this.object = object || {};

        this.refresh();

    }

    getObject() {

        return this.object;

    }

    //
    // Refresh
    //

    refresh() {

        if (!this.element)
            return;

        this.element.replaceChildren();

        this.fields = [];

        this.schema.forEach(fieldSchema => {

            const field = new PropertyField(fieldSchema);

            const element = field.render();

            field.setValue(
                this.object[fieldSchema.id]
            );

            field.onChange(value => {

                this.object[fieldSchema.id] = value;

            });

            this.fields.push(field);

            this.element.appendChild(element);

        });

    }

    //
    // Utility
    //

    clear() {

        this.object = {};

        this.refresh();

    }

}