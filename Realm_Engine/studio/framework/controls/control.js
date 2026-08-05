/**
 * ============================================================
 * Realm Studio
 * Base Control
 * ============================================================
 *
 * Base class for every interactive UI control.
 *
 * Responsibilities
 * ----------------
 * - Enabled / Disabled state
 * - Visible / Hidden state
 * - Tooltip
 * - Focus
 *
 * ============================================================
 */

import Component from "../core/component.js";

export default class Control extends Component {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor(options = {}) {

        super();

        this.enabled = options.enabled ?? true;

        this.visible = options.visible ?? true;

        this.tooltip = options.tooltip ?? "";

    }

    // ==========================================================
    // Public API
    // ==========================================================

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

    setTooltip(text) {

        this.tooltip = text;

        if (this.element)
            this.element.title = text;

        return this;

    }

    focus() {

        if (this.element)
            this.element.focus();

        return this;

    }

    blur() {

        if (this.element)
            this.element.blur();

        return this;

    }

    // ==========================================================
    // Protected Helpers
    // ==========================================================

    applyState() {

        if (!this.element)
            return;

        this.element.disabled = !this.enabled;

        this.element.title = this.tooltip;

        this.element.style.display =
            this.visible ? "" : "none";

    }

}