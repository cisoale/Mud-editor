/**
 * ============================================================
 * Realm Studio
 * Base Component
 * ============================================================
 *
 * Base class for every visual component.
 *
 * Lifecycle
 * ---------
 * constructor()
 * render()
 * refresh()
 * destroy()
 *
 * ============================================================
 */

export default class Component {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        this.element = null;

        this.rendered = false;

    }

    // ==========================================================
    // DOM Helpers
    // ==========================================================

    /**
     * Creates a DOM element.
     */
    createElement(tag, className = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        return element;

    }

    /**
     * Appends a child element.
     * Accepts both DOM nodes and Components.
     */
    append(child) {

        if (!this.element)
            throw new Error("Component has not been rendered.");

        if (child instanceof Component) {

            child = child.render();

        }

        this.element.appendChild(child);

        return this;

    }

    /**
     * Removes all child nodes.
     */
    clear() {

        if (this.element) {

            this.element.replaceChildren();

        }

        return this;

    }

    // ==========================================================
    // State
    // ==========================================================

    /**
     * Returns the root DOM element.
     */
    getElement() {

        return this.element;

    }

    /**
     * Returns true if the component
     * has already been rendered.
     */
    isRendered() {

        return this.rendered;

    }

    // ==========================================================
    // Lifecycle
    // ==========================================================

    /**
     * Must be overridden.
     */
    render() {

        throw new Error("render() not implemented");

    }

    /**
     * Marks the component as rendered.
     * Call this at the end of every render().
     */
    finishRender() {

        this.rendered = true;

        return this.element;

    }

    /**
     * Optional refresh hook.
     */
    refresh() {

    }

    /**
     * Removes the component from the DOM.
     */
    destroy() {

        if (this.element && this.element.parentNode) {

            this.element.parentNode.removeChild(this.element);

        }

        this.element = null;

        this.rendered = false;

    }

}