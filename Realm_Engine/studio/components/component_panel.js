/**
 * ============================================================
 * Realm Studio
 * Component Panel
 * ============================================================
 *
 * Generic collapsible panel used by the Inspector.
 *
 * Responsibilities
 * ----------------
 * - Display a component title.
 * - Expand / collapse.
 * - Host any editor component.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class ComponentPanel extends Component {

    constructor(title = "") {

        super();

        this.title = title;

        this.content = null;

        this.collapsed = false;

    }

    // ==========================================================
    // Title
    // ==========================================================

    setTitle(title) {

        this.title = title;

        if (this.titleElement) {

            this.titleElement.textContent = title;

        }

    }

    // ==========================================================
    // Content
    // ==========================================================

    setContent(component) {

        this.content = component;

        if (!this.body)
            return;

        this.body.replaceChildren();

        if (!component)
            return;

        this.body.appendChild(
            component.render()
        );

    }

    // ==========================================================
    // Collapse
    // ==========================================================

    setCollapsed(value) {

        this.collapsed = value;

        this.updateCollapse();

    }

    toggle() {

        this.collapsed = !this.collapsed;

        this.updateCollapse();

    }

    updateCollapse() {

        if (!this.body || !this.arrow)
            return;

        this.body.style.display =
            this.collapsed ? "none" : "";

        this.arrow.textContent =
            this.collapsed ? "▶" : "▼";

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement(
            "div",
            "component-panel"
        );

        //
        // Header
        //

        const header = this.createElement(
            "div",
            "component-panel-header"
        );

        this.arrow = this.createElement(
            "span",
            "component-panel-arrow"
        );

        this.arrow.textContent = "▼";

        this.titleElement = this.createElement(
            "span",
            "component-panel-title"
        );

        this.titleElement.textContent = this.title;

        header.appendChild(this.arrow);
        header.appendChild(this.titleElement);

        //
        // Body
        //

        this.body = this.createElement(
            "div",
            "component-panel-body"
        );

        if (this.content) {

            this.body.appendChild(
                this.content.render()
            );

        }

        //
        // Events
        //

        header.addEventListener("click", () => {

            this.toggle();

        });

        //
        // Layout
        //

        this.element.appendChild(header);
        this.element.appendChild(this.body);

        this.updateCollapse();

        return this.finishRender();

    }

}