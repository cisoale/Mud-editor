import Button from "../controls/button.js";
import Container from "../core/container.js";

export default class Toolbar extends Container {

    // ==========================================================
    // Constructor
    // ==========================================================

    constructor() {

        super();

        this.items = [];

        this.buttons = new Map();

        this.clickCallback = null;

    }

    // ==========================================================
    // Public API
    // ==========================================================

    addButton(options = {}) {

        this.items.push({

            type: "button",

            id: options.id,

            text: options.text ?? "",

            icon: options.icon ?? "",

            tooltip: options.tooltip ?? ""

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

    getButton(id) {

        return this.buttons.get(id);

    }

    enable(id) {

        this.buttons.get(id)?.enable();

        return this;

    }

    disable(id) {

        this.buttons.get(id)?.disable();

        return this;

    }

    show(id) {

        this.buttons.get(id)?.show();

        return this;

    }

    hide(id) {

        this.buttons.get(id)?.hide();

        return this;

    }

    removeButton(id) {

        this.items = this.items.filter(item => item.id !== id);

        const button = this.buttons.get(id);

        if (button)
            button.destroy();

        this.buttons.delete(id);

        return this;

    }

    clearButtons() {

        this.items = [];

        this.buttons.clear();

        this.clear();

        return this;

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    createButton(item) {

        const button = new Button({

            text: item.text,

            icon: item.icon,

            tooltip: item.tooltip

        });

        button.onClick(() => {

            if (this.clickCallback)
                this.clickCallback(item.id);

        });

        this.buttons.set(item.id, button);

        return button;

    }

    createSeparator() {

        const separator = document.createElement("div");

        separator.className = "toolbar-separator";

        return separator;

    }

    createSpacer() {

        const spacer = document.createElement("div");

        spacer.className = "toolbar-spacer";

        return spacer;

    }

    // ==========================================================
    // Render
    // ==========================================================

    render() {

        if (this.isRendered())
            return this.getElement();

        this.element = this.createElement(

            "div",

            "toolbar"

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

        return this.finishRender();

    }

}