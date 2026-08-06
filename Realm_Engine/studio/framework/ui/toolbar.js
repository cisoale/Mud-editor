/**
 * ============================================================
 * Realm Studio
 * Framework Toolbar
 * ============================================================
 *
 * Generic toolbar component.
 *
 * Responsibilities
 * ----------------
 * - Manage toolbar items
 * - Dispatch button events
 * - Handle button state
 * - Render toolbar controls
 *
 * This class is completely independent from Realm Studio.
 * Any module (Browser, Inspector, Builder...) can inherit it.
 *
 * ============================================================
 */

import Container from "../core/container.js";
import Button from "../controls/button.js";

export default class Toolbar extends Container {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        super();

        /**
         * Toolbar item definitions.
         *
         * [
         *   {
         *      type : "button",
         *      id   : "save",
         *      text : "Save",
         *      icon : "💾"
         *   }
         * ]
         */
        this.items = [];

        /**
         * Runtime button instances.
         */
        this.buttons = new Map();

        /**
         * Toolbar click callback.
         */
        this.clickCallback = null;

    }

    // ==========================================================
    // Configuration
    // ==========================================================

    addButton(options = {}) {

        this.items.push({

            type: "button",

            id: options.id,

            text: options.text ?? "",

            icon: options.icon ?? "",

            tooltip: options.tooltip ?? "",

            enabled: options.enabled ?? true,

            visible: options.visible ?? true

        });

        return this;

    }

    addSeparator() {

        this.items.push({

            type: "separator"

        });

        return this;

    }

    addSpacer() {

        this.items.push({

            type: "spacer"

        });

        return this;

    }

    onClick(callback) {

        this.clickCallback = callback;

        return this;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    getButton(id) {

        return this.buttons.get(id);

    }

    hasButton(id) {

        return this.buttons.has(id);

    }

    removeButton(id) {

        this.items = this.items.filter(item => item.id !== id);

        const button = this.buttons.get(id);

        if (button) {

            this.remove(button);

            this.buttons.delete(id);

        }

        return this;

    }

    clearButtons() {

        this.items = [];

        this.buttons.clear();

        this.clear();

        return this;

    }

    // ==========================================================
    // State Management
    // ==========================================================

    enable(id) {

        const button = this.buttons.get(id);

        if (button)
            button.enable();

        const item = this.items.find(item => item.id === id);

        if (item)
            item.enabled = true;

        return this;

    }

    disable(id) {

        const button = this.buttons.get(id);

        if (button)
            button.disable();

        const item = this.items.find(item => item.id === id);

        if (item)
            item.enabled = false;

        return this;

    }

    show(id) {

        const button = this.buttons.get(id);

        if (button)
            button.show();

        const item = this.items.find(item => item.id === id);

        if (item)
            item.visible = true;

        return this;

    }

    hide(id) {

        const button = this.buttons.get(id);

        if (button)
            button.hide();

        const item = this.items.find(item => item.id === id);

        if (item)
            item.visible = false;

        return this;

    }

    enableAll() {

        for (const item of this.items) {

            if (item.type === "button")
                this.enable(item.id);

        }

        return this;

    }

    disableAll() {

        for (const item of this.items) {

            if (item.type === "button")
                this.disable(item.id);

        }

        return this;

    }

    // ==========================================================
    // Internal Factory
    // ==========================================================

    createButton(item) {

        const button = new Button({

            text: item.text,

            icon: item.icon,

            tooltip: item.tooltip,

            enabled: item.enabled,

            visible: item.visible

        });

        button.onClick(() => {

            if (this.clickCallback)
                this.clickCallback(item.id);

        });

        this.buttons.set(item.id, button);

        return button;

    }

    createSeparator() {

        return this.createElement(
            "div",
            "toolbar-separator"
        );

    }

    createSpacer() {

        return this.createElement(
            "div",
            "toolbar-spacer"
        );

    }

    // ==========================================================
    // Rendering
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(
            "div",
            "ui-toolbar"
        );

        this.buttons.clear();

        for (const item of this.items) {

            switch (item.type) {

                case "button":

                    this.append(
                        this.createButton(item)
                    );

                    break;

                case "separator":

                    this.append(
                        this.createSeparator()
                    );

                    break;

                case "spacer":

                    this.append(
                        this.createSpacer()
                    );

                    break;

            }

        }

        this.renderChildren();

        return this.finishRender();

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    getButtons() {

        return [...this.buttons.values()];

    }

    getItems() {

        return [...this.items];

    }

    contains(id) {

        return this.buttons.has(id);

    }

    refresh() {

        if (!this.isRendered())
            return;

        const parent = this.element.parentNode;

        if (!parent)
            return;

        const next = this.render();

        parent.replaceChild(
            next,
            this.element
        );

    }

}