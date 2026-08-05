import Component from "../core/component.js";
import Control from "./control.js";

export default class Button extends Component {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor(options = {}) {

        super();

        this.text = options.text ?? "";
        this.icon = options.icon ?? "";
        this.tooltip = options.tooltip ?? "";

        this.enabled = options.enabled ?? true;
        this.visible = options.visible ?? true;

        this.clickCallback = null;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    setText(text) {

        this.text = text;

        if (this.element)
            this.element.textContent = this.icon
                ? `${this.icon} ${this.text}`
                : this.text;

        return this;

    }

    setIcon(icon) {

        this.icon = icon;

        if (this.element)
            this.setText(this.text);

        return this;

    }

    setTooltip(text) {

        this.tooltip = text;

        if (this.element)
            this.element.title = text;

        return this;

    }

    enable() {

        this.enabled = true;

        if (this.element)
            this.element.disabled = false;

        return this;

    }

    disable() {

        this.enabled = false;

        if (this.element)
            this.element.disabled = true;

        return this;

    }

    show() {

        this.visible = true;

        if (this.element)
            this.element.style.display = "";

        return this;

    }

    hide() {

        this.visible = false;

        if (this.element)
            this.element.style.display = "none";

        return this;

    }

    onClick(callback) {

        this.clickCallback = callback;

        return this;

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(
            "button",
            "ui-button"
        );

        this.element.type = "button";

        this.setText(this.text);

        this.setTooltip(this.tooltip);

        this.element.disabled = !this.enabled;

        if (!this.visible)
            this.element.style.display = "none";

        this.element.addEventListener("click", () => {

            if (this.clickCallback)
                this.clickCallback(this);

        });

        return this.finishRender();

    }

}/**
 * ============================================================
 * Realm Studio
 * Button Control
 * ============================================================
 *
 * Standard push button.
 *
 * Responsibilities
 * ----------------
 * - Render a button
 * - Display text/icon
 * - Raise click event
 *
 * ============================================================
 */

import Control from "./control.js";

export default class Button extends Control {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor(options = {}) {

        super(options);

        this.text = options.text ?? "";

        this.icon = options.icon ?? "";

        this.clickCallback = null;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    setText(text) {

        this.text = text;

        this.refresh();

        return this;

    }

    setIcon(icon) {

        this.icon = icon;

        this.refresh();

        return this;

    }

    onClick(callback) {

        this.clickCallback = callback;

        return this;

    }

    // ==========================================================
    // Lifecycle
    // ==========================================================

    refresh() {

        if (!this.element)
            return;

        this.element.textContent = this.icon
            ? `${this.icon} ${this.text}`
            : this.text;

    }

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(
            "button",
            "ui-button"
        );

        this.element.type = "button";

        this.refresh();

        this.applyState();

        this.element.addEventListener("click", event => {

            if (!this.enabled)
                return;

            if (this.clickCallback)
                this.clickCallback(event);

        });

        return this.finishRender();

    }

}