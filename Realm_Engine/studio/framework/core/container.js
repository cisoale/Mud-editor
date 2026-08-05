/**
 * ============================================================
 * Realm Studio
 * Base Container
 * ============================================================
 *
 * Base class for every UI container.
 *
 * Responsibilities
 * ----------------
 * - Store child components
 * - Add / Remove children
 * - Clear children
 * - Render children
 *
 * ============================================================
 */

import Component from "./component.js";

export default class Container extends Component {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        super();

        this.children = [];

    }

    // ==========================================================
    // Protected
    // ==========================================================

    /**
     * Returns the element that will receive child components.
     * Subclasses may override this.
     */
    getContentElement() {

        return this.element;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    append(child) {

        this.children.push(child);

        if (this.isRendered()) {

            const parent = this.getContentElement();

            if (child instanceof Component)
                parent.appendChild(child.render());
            else
                parent.appendChild(child);

        }

        return this;

    }

    remove(child) {

        const index = this.children.indexOf(child);

        if (index !== -1)
            this.children.splice(index, 1);

        if (child instanceof Component) {

            child.destroy();

        } else if (child instanceof HTMLElement && child.parentNode) {

            child.parentNode.removeChild(child);

        }

        return this;

    }

    clear() {

        for (const child of this.children) {

            if (child instanceof Component)
                child.destroy();

        }

        this.children = [];

        const parent = this.getContentElement();

        if (parent)
            parent.replaceChildren();

        return this;

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    renderChildren() {

        const parent = this.getContentElement();

        for (const child of this.children) {

            if (child instanceof Component)
                parent.appendChild(child.render());
            else
                parent.appendChild(child);

        }

    }

}