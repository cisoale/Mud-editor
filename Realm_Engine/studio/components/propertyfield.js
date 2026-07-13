/**
 * ============================================================
 * Realm Studio
 * PropertyField Component
 * ============================================================
 *
 * Generic property editor.
 *
 * Responsibilities
 * ----------------
 * - Displays a label.
 * - Displays an editor.
 * - Stores a value.
 * - Notifies value changes.
 *
 * Supported types
 * ---------------
 * text
 * number
 * checkbox
 * textarea
 * select
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class PropertyField extends Component {

    constructor(schema = {}) {

        super();

        this.schema = schema;

        this.value = null;

        this.input = null;

        this.changeCallback = null;

    }

    render() {

        this.element = this.createElement("div", "property-field");

        //
        // Label
        //

        const label = this.createElement("label", "property-label");

        label.textContent = this.schema.label || "";

        this.element.appendChild(label);

        //
        // Editor
        //

        this.input = this.createInput();

        this.element.appendChild(this.input);

        return this.element;

    }

    createInput() {

        let input;

        switch (this.schema.type) {

            case "textarea":

                input = this.createElement("textarea", "property-input");

                break;

            case "checkbox":

                input = this.createElement("input", "property-input");

                input.type = "checkbox";

                break;

            case "number":

                input = this.createElement("input", "property-input");

                input.type = "number";

                break;

            case "select":

                input = this.createElement("select", "property-input");

                (this.schema.options || []).forEach(option => {

                    const element = document.createElement("option");

                    element.value = option;
                    element.textContent = option;

                    input.appendChild(element);

                });

                break;

            default:

                input = this.createElement("input", "property-input");

                input.type = "text";

                break;

        }

        input.addEventListener("input", () => {

            this.value = this.getValue();

            if (this.changeCallback) {

                this.changeCallback(this.value);

            }

        });

        input.addEventListener("change", () => {

            this.value = this.getValue();

            if (this.changeCallback) {

                this.changeCallback(this.value);

            }

        });

        return input;

    }

    setValue(value) {

        this.value = value;

        if (!this.input)
            return;

        switch (this.schema.type) {

            case "checkbox":

                this.input.checked = Boolean(value);

                break;

            default:

                this.input.value = value ?? "";

                break;

        }

    }

    getValue() {

        if (!this.input)
            return null;

        switch (this.schema.type) {

            case "checkbox":

                return this.input.checked;

            case "number":

                return Number(this.input.value);

            default:

                return this.input.value;

        }

    }

    focus() {

        if (this.input) {

            this.input.focus();

        }

    }

    clear() {

        this.setValue("");

    }

    onChange(callback) {

        this.changeCallback = callback;

    }

}