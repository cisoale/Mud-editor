/**
 * ============================================================
 * Realm Studio
 * Panel
 * ============================================================
 *
 * Generic container with title and body.
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

    append(child) {

        this.children.push(child);

        if (this.body) {

            if (child.render)
                this.body.appendChild(child.render());
            else
                this.body.appendChild(child);

        }

        return this;

    }

    clear() {

        this.children = [];

        if (this.body)
            this.body.replaceChildren();

        return this;

    }

    // ==========================================================
    // Protected
    // ==========================================================

    renderChildren() {

        for (const child of this.children) {

            if (child.render)
                this.body.appendChild(child.render());
            else
                this.body.appendChild(child);

        }

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

        this.header = this.createElement(
            "div",
            "panel-header"
        );

        this.header.textContent = this.title;

        this.body = this.createElement(
            "div",
            "panel-body"
        );

        this.element.appendChild(this.header);
        this.element.appendChild(this.body);

        this.renderChildren();

        return this.finishRender();

    }

}