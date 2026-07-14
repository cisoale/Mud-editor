/**
 * ============================================================
 * Realm Studio
 * Splitter
 * ============================================================
 *
 * Generic two-panel layout.
 *
 * Responsibilities
 * ----------------
 * - Displays two components.
 * - Never recreates components.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

export default class Splitter extends Component {

    constructor() {

        super();

        this.left = null;
        this.right = null;

        this.ratio = 35;

        this.leftPane = null;
        this.rightPane = null;

    }

    render() {

        if (this.isRendered()) {

            return this.getElement();

        }

        this.element = this.createElement("div", "splitter");

        this.leftPane = this.createElement(
            "div",
            "splitter-left"
        );

        this.rightPane = this.createElement(
            "div",
            "splitter-right"
        );

        this.leftPane.style.flex = this.ratio;
        this.rightPane.style.flex = 100 - this.ratio;

        this.element.appendChild(this.leftPane);
        this.element.appendChild(this.rightPane);

        this.refresh();

        return this.finishRender();

    }

    setLeft(component) {

        this.left = component;

        this.refresh();

    }

    setRight(component) {

        this.right = component;

        this.refresh();

    }

    setRatio(percent) {

        this.ratio = percent;

        if (this.leftPane) {

            this.leftPane.style.flex = percent;

        }

        if (this.rightPane) {

            this.rightPane.style.flex = 100 - percent;

        }

    }

    refresh() {

        if (!this.leftPane || !this.rightPane)
            return;

        this.leftPane.replaceChildren();
        this.rightPane.replaceChildren();

        //
        // LEFT
        //

        if (this.left) {

            if (!this.left.isRendered()) {

                this.left.render();

            }

            this.leftPane.appendChild(
                this.left.getElement()
            );

        }

        //
        // RIGHT
        //

        if (this.right) {

            if (!this.right.isRendered()) {

                this.right.render();

            }

            this.rightPane.appendChild(
                this.right.getElement()
            );

        }

    }

}