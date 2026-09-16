/**
 * ============================================================
 * Realm Studio
 * Panel
 * ============================================================
 *
 * Generic UI container with a title and a content area.
 *
 * Responsibilities
 * ----------------
 * - Display a header
 * - Display a content area
 * - Delegate child management to Container
 *
 * ============================================================
 */

import Container from "../core/container.js";

export default class Panel extends Container {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor(title = "") {

        super();

        this.title = title;

        this.header = null;
        this.body = null;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    setTitle(title) {

        this.title = title;

        if (this.header)
            this.header.textContent = title;

        return this;

    }

    getTitle() {

        return this.title;

    }

    // ==========================================================
    // Protected
    // ==========================================================

    /**
     * Children are inserted inside the body.
     */
    getContentElement() {

        return this.body;

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(
            "div",
            "panel"
        );

        // ------------------------------------------------------
        // Header
        // ------------------------------------------------------

        this.header = this.createElement(
            "div",
            "panel-header"
        );

        this.header.textContent = this.title;

        // ------------------------------------------------------
        // Body
        // ------------------------------------------------------

        this.body = this.createElement(
            "div",
            "panel-body"
        );

        this.element.appendChild(this.header);
        this.element.appendChild(this.body);

        // ------------------------------------------------------
        // Children
        // ------------------------------------------------------

        this.renderChildren();

        return this.finishRender();

    }

}