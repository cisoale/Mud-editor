/**
 * ============================================================
 * Realm Studio
 * Splitter Component
 * ============================================================
 *
 * Generic horizontal splitter.
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

        this.element = this.createElement("div", "splitter");

        this.leftPane = this.createElement("div", "splitter-left");
        this.rightPane = this.createElement("div", "splitter-right");

        this.leftPane.style.flex = this.ratio;
        this.rightPane.style.flex = 100 - this.ratio;

        this.element.appendChild(this.leftPane);
        this.element.appendChild(this.rightPane);

        this.refresh();

        return this.element;

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

        if (this.leftPane && this.rightPane) {

            this.leftPane.style.flex = percent;
            this.rightPane.style.flex = 100 - percent;

        }

    }

    refresh() {

        if (!this.leftPane || !this.rightPane)
            return;

        this.leftPane.replaceChildren();
        this.rightPane.replaceChildren();

        if (this.left) {

            const element = this.left.element || this.left.render();

            this.leftPane.appendChild(element);

        }

        if (this.right) {

            const element = this.right.element || this.right.render();

            this.rightPane.appendChild(element);

        }

    }

}