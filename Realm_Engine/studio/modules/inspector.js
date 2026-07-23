/**
 * ============================================================
 * Realm Studio
 * Inspector
 * ============================================================
 *
 * Displays all ECS components of the selected entity.
 *
 * Responsibilities
 * ----------------
 * - Receives an Entity.
 * - Retrieves component schemas from SchemaLoader.
 * - Creates one ComponentPanel per component.
 * - Creates one PropertyGrid per component.
 *
 * ============================================================
 */

import Component from "../framework/component.js";

import ComponentPanel from "../components/component_panel.js";
import PropertyGrid from "./propertygrid.js";

export default class Inspector extends Component {

    constructor(schemaLoader) {

        super();

        this.schemaLoader = schemaLoader;

        this.entity = null;

        this.panels = [];

    }

    // ==========================================================
    // Entity
    // ==========================================================

    setEntity(entity) {
        console.log("[Inspector] Entity:", entity);
        this.entity = entity;

        this.refresh();

    }

    getEntity() {

        return this.entity;

    }

    // ==========================================================
    // Refresh
    // ==========================================================

    refresh() {

        if (!this.element)
            return;

        this.element.replaceChildren();

        this.panels = [];

        if (!this.entity)
            return;

        const components = this.entity.components || {};

        for (const componentId of Object.keys(components)) {

            if (!this.schemaLoader)
                continue;

            const schema = this.schemaLoader.get(componentId);

            if (!schema)
                continue;

            const grid = new PropertyGrid();

            grid.setSchema(schema.fields || []);

            grid.setObject(
                components[componentId]
            );

            const panel = new ComponentPanel(
                schema.name || componentId
            );

            panel.setContent(grid);

            this.panels.push(panel);

            this.element.appendChild(
                panel.render()
            );

        }

    }

    // ==========================================================
    // Helpers
    // ==========================================================

    clear() {

        this.entity = null;

        this.refresh();

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
            "inspector"
        );

        this.refresh();

        return this.finishRender();

    }

}